"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { loginAdmin } from "@/lib/actions/auth";
import { useMounted } from "@/lib/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  // Lint-safe replacement for the old useState + useEffect mount guard
  const mounted = useMounted();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  function onInvalid(errors: FieldErrors<LoginFormValues>) {
    const firstError = Object.values(errors)[0];
    const message =
      (firstError && "message" in firstError && (firstError.message as string)) ||
      "Please enter a valid email and password.";
    toast.error(message);
  }

  function onSubmit(values: LoginFormValues) {
    startTransition(async () => {
      const result = await loginAdmin(values);

      if (result.status === "success") {
        toast.success("Welcome back!");
        router.push("/admin/dashboard");
        router.refresh();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  // If the component hasn't mounted on the client yet, return a skeleton
  // that matches the exact dimensions of the card to prevent layout shift.
  if (!mounted) {
    return (
      <Card className="w-full max-w-md border-border/60 shadow-lg h-[420px] animate-pulse bg-card/50" />
    );
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardContent className="p-6 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-2xl font-semibold">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access the GJR Events management dashboard.
          </p>
        </div>

        <Form {...form}>
          {/* Added suppressHydrationWarning to the form wrapper */}
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            noValidate
            className="mt-8 space-y-5"
            suppressHydrationWarning
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    {/* Anti-autofill hydration guards */}
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="admin@gjrevents.com"
                      autoComplete="username"
                      suppressHydrationWarning
                      data-lpignore="true"
                      className="text-base h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Anti-autofill hydration guards */}
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        suppressHydrationWarning
                        data-lpignore="true"
                        className="text-base h-12 pr-11"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full min-h-[44px]" size="lg" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}