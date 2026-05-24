"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { customerRegister } from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";
import { useCustomer } from "../_components/customer-provider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const { setSession } = useCustomer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!accept) {
      setError("Please accept terms and privacy policy.");
      return;
    }

    setSubmitting(true);
    const response = await customerRegister({ name, email, password });
    setSubmitting(false);

    if (!response.success || !response.data) {
      setError(response.message ?? "Could not create account.");
      return;
    }

    setSession({ token: response.data.token, user: response.data.user });
    router.replace("/account");
  };

  return (
    <PageChrome activeHref="/register" ariaLabelledBy="register-title" className="route-screen auth-screen" footer="Registration creates a CUSTOMER account linked to future checkouts and downloads.">
      <section className="auth-panel" aria-label="Registration form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Register</span> Buyer profile</p>
          <h1 id="register-title" className="page-title compact-title">Create your PROGMAN account.</h1>
          <p className="page-copy">Store purchase history, order references, and fulfillment access in one place.</p>
        </div>
        <form className="auth-card" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="register-name">Name</Label>
            <Input
              id="register-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
            />
          </div>
          <label className="!grid !grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2 text-sm">
            <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
            <span>
              I agree to <Link href="/legal/terms" className="underline">terms</Link> and <Link href="/legal/privacy" className="underline">privacy policy</Link>.
            </span>
          </label>
          {error ? (
            <p className="form-error">{error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </Button>
          <p>Already have access? <Link href="/login">Login</Link></p>
        </form>
      </section>
    </PageChrome>
  );
}
