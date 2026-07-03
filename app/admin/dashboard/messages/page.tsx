import { createAdminClient } from "@/lib/supabase/admin";
import { MessagesList } from "@/components/admin/messages-list";

export const revalidate = 60; // or whatever's appropriate — not force-dynamic

async function getAllMessages() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin messages fetch error:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Contact Messages</h1>
        <p className="text-sm text-muted-foreground">
          View and manage messages submitted through the contact form.
        </p>
      </div>
      <MessagesList messages={messages} />
    </div>
  );
}
