"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  CalendarCheck, 
  PartyPopper, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Users,
  Calendar
} from "lucide-react";
import type { z } from "zod";

import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/lib/actions/booking";
import { EVENT_TYPES } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type BookingInput = z.input<typeof bookingSchema>;

export function BookingForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);
  // Date boundary logic
  const today = new Date().toISOString().split("T")[0];
  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  const maxDate = sixMonthsLater.toISOString().split("T")[0];

  const form = useForm<BookingInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      event_type: undefined,
      event_date: "",
      guest_count: "" as unknown as number,
      location: "",
      message: "",
    },
  });

  function onSubmit(values: BookingFormValues) {
    startTransition(async () => {
      const result = await createBooking(values);

      if (result.status === "success") {
        toast.success(result.message);
        setSubmitted(true);
        form.reset();
      } else if (result.status === "error") {
        toast.error(result.message);

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              form.setError(field as keyof BookingInput, {
                message: messages[0],
              });
            }
          });
        }
      }
    });
  }

  function onInvalid(errors: FieldErrors<BookingInput>) {
    const firstError = Object.values(errors)[0];
    const msg =
      (firstError && "message" in firstError && (firstError.message as string)) ||
      "Please fill all required fields correctly.";

    toast.error(msg);
  }

  // Consistent input base styling
  const inputBaseClass = "w-full bg-[#0a0a0a]/80 border border-[#D4AF37]/30 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-base h-12 transition-colors duration-200 rounded-lg min-w-0 outline-none";

  if (!isMounted) {
    return (
      <div className="mx-auto w-full max-w-2xl bg-black/90 backdrop-blur-lg border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)]">
        <div className="mb-8 md:mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left border-b border-[#D4AF37]/20 pb-6">
          <div className="h-12 w-12 rounded-full bg-zinc-800 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-64 bg-zinc-800/50 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-5 md:space-y-6 opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-[120px] w-full bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-[52px] w-full bg-zinc-800 rounded-xl mt-4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-xl border border-[#D4AF37]/30 bg-black/90 backdrop-blur-md text-white p-6 sm:p-10 md:p-12 rounded-2xl text-center shadow-[0_0_30px_-10px_rgba(212,175,55,0.2)] animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#f4d068] text-black shadow-lg">
            <PartyPopper className="h-8 w-8" />
          </div>
        </div>

        <h3 className="mt-6 text-2xl md:text-3xl font-semibold text-[#D4AF37] tracking-wide">
          Request Received
        </h3>

        <p className="mt-3 md:mt-4 text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          Thank you. We will contact you within 24 hours to begin planning your spectacular event.
        </p>

        <Button
          onClick={() => setSubmitted(false)}
          className="mt-8 w-full sm:w-auto bg-[#D4AF37] text-black font-semibold hover:bg-[#b8942f] hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] transition-all duration-300 min-h-[48px] px-8 rounded-xl"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl bg-black/90 backdrop-blur-lg border border-[#D4AF37]/30 text-white rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)]">
      {/* Header Section */}
      <div className="mb-8 md:mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left border-b border-[#D4AF37]/20 pb-6">
        <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#b8942f] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <CalendarCheck className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] tracking-wider uppercase">
            Book Your Event
          </h2>
          <p className="text-sm text-zinc-400 mt-1 md:mt-1.5">
            Provide your details below and our team will get back to you within 24 hours.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-5 md:space-y-6 animate-in fade-in duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#D4AF37]">
                        <User className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                      </div>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className={`${inputBaseClass} pl-11`}
                        placeholder="e.g. Jane Doe"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                      </div>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="email"
                        inputMode="email"
                        className={`${inputBaseClass} pl-11`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                    </div>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="tel"
                      inputMode="tel"
                      className={`${inputBaseClass} pl-11`}
                      placeholder="Mobile number"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <FormField
              control={form.control}
              name="event_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Event Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                          <PartyPopper className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                        </div>
                        <SelectTrigger className={`${inputBaseClass} pl-11 data-[state=open]:border-[#D4AF37] data-[state=open]:ring-1 data-[state=open]:ring-[#D4AF37]/50`}>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent className="bg-black border-[#D4AF37]/30 text-white shadow-xl">
                      {EVENT_TYPES.map((type) => (
                        <SelectItem 
                          key={type} 
                          value={type} 
                          className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Event Date
                  </FormLabel>
                  <FormControl>
                    <div 
                      className="relative overflow-hidden rounded-lg cursor-pointer group"
                      onClick={(e) => {
                        const input = e.currentTarget.querySelector('input[type="date"]') as HTMLInputElement;
                        if (input && 'showPicker' in input) {
                          try { input.showPicker(); } catch {}
                        }
                      }}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-20">
                        <Calendar className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                      </div>
                      
                      <Input
                        type="date"
                        {...field}
                        value={field.value ?? ""}
                        min={today}
                        max={maxDate}
                        style={{ colorScheme: "dark" }}
                        className={`
                          peer
                          ${inputBaseClass} 
                          pl-11 pr-3 
                          appearance-none 
                          bg-transparent 
                          relative z-30 
                          cursor-pointer
                          ${!field.value ? 'text-transparent focus:text-zinc-400' : 'text-white'}
                          [&::-webkit-calendar-picker-indicator]:opacity-0 
                          [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        `}
                      />
                      
                      {!field.value && (
                        <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-zinc-500 z-10 text-base peer-focus:hidden">
                          Select a date
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <FormField
              control={form.control}
              name="guest_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Estimated Guests
                  </FormLabel>
                  <Select 
                    onValueChange={(val) => field.onChange(Number(val))} 
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                          <Users className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                        </div>
                        <SelectTrigger className={`${inputBaseClass} pl-11 data-[state=open]:border-[#D4AF37] data-[state=open]:ring-1 data-[state=open]:ring-[#D4AF37]/50`}>
                          <SelectValue placeholder="Select guest count" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent className="bg-black border-[#D4AF37]/30 text-white shadow-xl">
                      <SelectItem value="50" className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2">Less than 50</SelectItem>
                      <SelectItem value="100" className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2">50 - 100</SelectItem>
                      <SelectItem value="200" className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2">100 - 200</SelectItem>
                      <SelectItem value="300" className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2">200 - 300</SelectItem>
                      <SelectItem value="500" className="focus:bg-[#D4AF37]/20 focus:text-[#D4AF37] cursor-pointer py-2">300+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                    Location / Venue
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                      </div>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className={`${inputBaseClass} pl-11`}
                        placeholder="City or Venue Name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                  Additional Details
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
                    </div>
                    <Textarea
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      disabled={field.disabled}
                      value={field.value ?? ""}
                      className="w-full bg-[#0a0a0a]/80 border border-[#D4AF37]/30 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-base min-w-0 min-h-[120px] rounded-lg pl-11 pt-3.5 resize-y transition-colors duration-200 outline-none"
                      placeholder="Tell us a bit more about your vision..."
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#e4c568] text-black font-bold uppercase tracking-wider hover:opacity-90 hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] transition-all duration-300 min-h-[52px] text-base rounded-xl mt-4"
          >
            {isPending ? "Submitting Request..." : "Submit Booking Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
}