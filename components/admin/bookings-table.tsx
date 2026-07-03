"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Search, Trash2, CheckCircle2, CalendarX } from "lucide-react";
import { updateBookingStatus, deleteBooking } from "@/lib/actions/booking-admin";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Booking, BookingStatus } from "@/types/database";

const STATUS_OPTIONS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_VARIANT: Record<BookingStatus, "outline" | "success" | "warning" | "destructive"> = {
  pending: "warning",
  confirmed: "outline",
  completed: "success",
  cancelled: "destructive",
};

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        booking.full_name.toLowerCase().includes(q) ||
        booking.email.toLowerCase().includes(q) ||
        booking.phone.toLowerCase().includes(q) ||
        booking.location.toLowerCase().includes(q) ||
        booking.event_type.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, statusFilter]);

  function handleMarkCompleted(id: string) {
    startTransition(async () => {
      const result = await updateBookingStatus(id, "completed");
      if (result.status === "success") toast.success(result.message);
      else if (result.status === "error") toast.error(result.message);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteBooking(id);
      if (result.status === "success") toast.success(result.message);
      else if (result.status === "error") toast.error(result.message);
    });
  }

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Search + filter bar — NOT inside the scroll container */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-11 text-base w-full"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as BookingStatus | "all")}
        >
          <SelectTrigger className="w-full sm:w-52 h-11 text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center px-4">
          <CalendarX className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-serif text-lg font-semibold">
            No bookings found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter.
          </p>
        </div>
      ) : (
        // Table already provides its own overflow-x-auto scroll container,
        // so we don't wrap it in a second one here.
        <div className="rounded-xl border border-border bg-card overflow-hidden w-full min-w-0 relative">
          <Table className="w-full min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap min-w-[200px]">Client</TableHead>
                <TableHead className="whitespace-nowrap min-w-[150px]">Event</TableHead>
                <TableHead className="whitespace-nowrap min-w-[120px]">Date</TableHead>
                <TableHead className="whitespace-nowrap">Guests</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap min-w-[140px]">Submitted</TableHead>
                <TableHead className="text-right whitespace-nowrap min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="min-w-[200px]">
                    <p className="font-medium whitespace-nowrap">{booking.full_name}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {booking.email}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {booking.phone}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    <p className="text-sm whitespace-nowrap">{booking.event_type}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {booking.location}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(booking.event_date)}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {booking.guest_count}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={STATUS_VARIANT[booking.status]}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(booking.created_at)}
                  </TableCell>
                  <TableCell>
  <div className="flex justify-end gap-2 whitespace-nowrap">
    {booking.status !== "completed" && (
      <Button
        size="icon"
        variant="outline"
        disabled={isPending}
        title="Mark as completed"
        onClick={() => handleMarkCompleted(booking.id)}
      >
        <CheckCircle2 className="h-4 w-4" />
      </Button>
    )}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" title="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
          <AlertDialogDescription className="break-words">
            This will permanently remove {booking.full_name}
            &apos;s booking request. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(booking.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}