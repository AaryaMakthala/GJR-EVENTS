"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2, MessageSquareOff } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/lib/actions/messages";
import { formatDateTime, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import type { ContactMessage } from "@/types";

export function MessagesList({ messages }: { messages: ContactMessage[] }) {
  const [isPending, startTransition] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleToggleRead(id: string, isRead: boolean) {
    startTransition(async () => {
      const result = await markMessageRead(id, !isRead);
      if (result.status === "error") toast.error(result.message);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (result.status === "success") toast.success(result.message);
      else if (result.status === "error") toast.error(result.message);
    });
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
        <MessageSquareOff className="h-10 w-10 text-muted-foreground" />
        <p className="mt-4 font-serif text-lg font-semibold">
          No messages yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const isExpanded = expandedId === message.id;
        return (
          <Card
            key={message.id}
            className={cn(
              "border-border/60 transition-colors",
              !message.is_read && "border-primary/40 bg-accent/20"
            )}
          >
            <CardContent className="p-5">
              <div
                className="flex cursor-pointer flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                onClick={() => setExpandedId(isExpanded ? null : message.id)}
              >
                <div className="flex items-start gap-3">
                  {!message.is_read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                  <div>
                    <p className="font-medium">
                      {message.full_name}{" "}
                      <span className="font-normal text-muted-foreground">
                        &mdash; {message.subject}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {message.email}
                      {message.phone ? ` · ${message.phone}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={message.is_read ? "outline" : "default"}>
                    {message.is_read ? "Read" : "New"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDateTime(message.created_at)}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  <p className="text-sm text-foreground/90">{message.message}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRead(message.id, message.is_read);
                      }}
                    >
                      {message.is_read ? (
                        <>
                          <Mail className="h-4 w-4" /> Mark Unread
                        </>
                      ) : (
                        <>
                          <MailOpen className="h-4 w-4" /> Mark Read
                        </>
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove this contact message.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(message.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
