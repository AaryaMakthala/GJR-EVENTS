"use client";

import { useTransition } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { createContactMessage } from "@/lib/actions/contact";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await createContactMessage(values);

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
      } else if (result.status === "error") {
        toast.error(result.message);

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              form.setError(field as keyof ContactFormValues, {
                message: messages[0],
              });
            }
          });
        }
      }
      // "idle" is the initial state and should never be returned from
      // a submitted action — nothing to handle here.
    });
  }

  function onInvalid(errors: FieldErrors<ContactFormValues>) {
    const first = Object.values(errors)[0];
    const msg =
      (first && "message" in first && (first.message as string)) ||
      "Please fill all required fields correctly.";

    toast.error(msg);
  }

  const inputClass =
    "bg-black border border-[#D4AF37]/30 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-base h-12";

  const labelClass = "text-[#D4AF37] text-sm tracking-wide";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="space-y-5 sm:space-y-6"
      >
        {/* GRID — stacks on mobile, 2 columns on sm+ */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Full Name</FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Your full name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email Address</FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* PHONE */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  type="tel"
                  inputMode="tel"
                  placeholder="9876543210"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBJECT */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Subject</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Event enquiry"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MESSAGE — explicit prop wiring since value may be nullable */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Message</FormLabel>
              <FormControl>
                <Textarea
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                  disabled={field.disabled}
                  value={field.value ?? ""}
                  className={`${inputClass} min-h-36 h-auto py-3`}
                  placeholder="Tell us about your event..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BUTTON — full width on mobile, min 44px tap target */}
        <Button
          type="submit"
          disabled={isPending}
          className="
            w-full sm:w-auto
            min-h-[44px]
            bg-[#D4AF37]
            text-black
            font-semibold
            hover:bg-[#b8942f]
            shadow-[0_0_25px_rgba(212,175,55,0.25)]
          "
        >
          {isPending ? "Sending..." : "Send Message"}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}