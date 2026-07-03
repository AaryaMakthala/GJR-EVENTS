import "server-only";

export async function sendTelegramNotification(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram credentials are not configured. Skipping notification.");
    return { ok: false as const, skipped: true as const };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Telegram notification failed:", errorBody);
      return { ok: false as const, skipped: false as const };
    }

    return { ok: true as const, skipped: false as const };
  } catch (error) {
    console.error("Telegram notification error:", error);
    return { ok: false as const, skipped: false as const };
  }
}

export function formatBookingNotification(booking: {
  full_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guest_count: number;
  location: string;
  message?: string | null;
}) {
  const lines = [
    "<b>🎉 New Booking Request — GJR EVENTS</b>",
    "",
    `<b>Name:</b> ${escapeHtml(booking.full_name)}`,
    `<b>Email:</b> ${escapeHtml(booking.email)}`,
    `<b>Phone:</b> ${escapeHtml(booking.phone)}`,
    `<b>Event Type:</b> ${escapeHtml(booking.event_type)}`,
    `<b>Event Date:</b> ${escapeHtml(booking.event_date)}`,
    `<b>Guests:</b> ${booking.guest_count}`,
    `<b>Location:</b> ${escapeHtml(booking.location)}`,
  ];

  if (booking.message) {
    lines.push(`<b>Message:</b> ${escapeHtml(booking.message)}`);
  }

  return lines.join("\n");
}

export function formatContactNotification(contact: {
  full_name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  const lines = [
    "<b>✉️ New Contact Message — GJR EVENTS</b>",
    "",
    `<b>Name:</b> ${escapeHtml(contact.full_name)}`,
    `<b>Email:</b> ${escapeHtml(contact.email)}`,
  ];

  if (contact.phone) {
    lines.push(`<b>Phone:</b> ${escapeHtml(contact.phone)}`);
  }

  lines.push(
    `<b>Subject:</b> ${escapeHtml(contact.subject)}`,
    `<b>Message:</b> ${escapeHtml(contact.message)}`
  );

  return lines.join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
