"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerCustomer } from "@digital-market/api-client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthShell } from "../../components/account/AuthShell";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

export function RegisterClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const commitLogin = useAuthStore((state) => state.login);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) router.replace(nextPath);
  }, [hydrated, isAuthenticated, nextPath, router]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const response = await registerCustomer({ firstName, lastName, email, password });
    setLoading(false);

    if (!response.success || !response.data) {
      const message = response.message ?? "Registration failed.";
      setError(message);
      toast.error("Could not create account", message);
      return;
    }

    commitLogin(response.data.user);
    toast.success("Account created", "Your customer area is ready.");
    router.push(nextPath);
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start a simple customer account."
      description="Save purchases, downloads, support history, and profile details in one place."
      footer={
        <span>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Login
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
          </Field>
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
