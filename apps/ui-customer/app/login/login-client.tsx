"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { customerGetMe, customerLogin } from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";
import { useCustomer } from "../_components/customer-provider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next") || "/account";
  const { setSession, token, user } = useCustomer();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && user) {
      router.replace(nextPath);
      return;
    }

    if (token && !user) {
      void customerGetMe().then((response) => {
        if (response.success && response.data) {
          setSession({ token, user: response.data });
          router.replace(nextPath);
        }
      });
    }
  }, [nextPath, router, setSession, token, user]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await customerLogin({ login, password });
    setSubmitting(false);

    if (!response.success || !response.data) {
      setError(response.message ?? "Invalid credentials.");
      return;
    }

    setSession({ token: response.data.token, user: response.data.user });
    router.replace(nextPath);
  };

  return (
    <PageChrome activeHref="/login" ariaLabelledBy="login-title" className="route-screen auth-screen" footer="Email/password login gives access to account orders, downloads, and profile settings.">
      <section className="auth-panel" aria-label="Login form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Login</span> Customer access</p>
          <h1 id="login-title" className="page-title compact-title">Access your PROGMAN account.</h1>
          <p className="page-copy">Sign in to track orders, regenerate confirmations, and access downloads.</p>
        </div>
        <form className="auth-card" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-username">Email or username</Label>
            <Input
              id="login-username"
              type="text"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          {error ? (
            <p className="form-error">{error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </Button>
          <p>New here? <Link href="/register">Create an account</Link></p>
          <p><Link href="/forgot-password">Forgot password?</Link></p>
        </form>
      </section>
    </PageChrome>
  );
}
