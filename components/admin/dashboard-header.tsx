"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <p className="font-serif text-lg font-semibold">Dashboard</p>
        <p className="text-xs text-muted-foreground">
          Welcome back, manage your events business
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 sm:flex">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-accent text-accent-foreground">
              {email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{email}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => startTransition(() => logoutAdmin())}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
