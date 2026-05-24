"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { login as loginCustomer, mockCustomers } from "@digital-market/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function LoginClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const commitLogin = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [password, setPassword] = useState("demo-password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) router.replace(nextPath);
  }, [hydrated, isAuthenticated, nextPath, router]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const response = await loginCustomer({ email, password });
    setLoading(false);

    if (!response.success || !response.data) {
      const message = response.message ?? "Login failed.";
      setError(message);
      toast.error("Login failed", message);
      return;
    }

    commitLogin(response.data.user);
    toast.success("Welcome back", `Signed in as ${response.data.user.displayName ?? response.data.user.email}.`);
    router.push(nextPath);
  };

  return (
    <div className="page-container py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_420px]">
        <section className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10 md:p-8">
          <p className="font-hand text-2xl text-primary">Welcome back.</p>
          <h1 className="mt-3 max-w-xl text-4xl font-extrabold md:text-5xl">
            Access your customer account.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Continue to your downloads, orders, profile details, and support tickets.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Orders and invoices", "Download history", "Support tickets", "Profile settings"].map((item) => (
              <div key={item} className="rounded-lg border bg-muted/40 p-4 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Use any seeded customer email. The mock password is accepted.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="pr-10"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </Field>

                {error && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" fullWidth disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>
              </FieldGroup>
            </form>

            <Separator className="my-5" />

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Seed accounts</p>
              {mockCustomers.slice(0, 3).map((customer) => {
                const selected = customer.email === email;
                return (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => setEmail(customer.email)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left ${
                      selected ? "border-primary bg-accent" : "bg-background hover:bg-muted/50"
                    }`}
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                      {getInitials(customer.displayName ?? customer.email)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {customer.displayName ?? customer.email}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {customer.email}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link href="/register" className="font-medium text-primary">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
