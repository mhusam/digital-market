"use client";

import Link from "next/link";
import { useState } from "react";
import { customerForgotPassword } from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";

export default function ForgotPasswordPage() {
  const [login, setLogin] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const response = await customerForgotPassword(login);
    setSubmitting(false);
    setMessage(response.data?.message ?? response.message ?? "Request completed.");
  };

  return (
    <PageChrome activeHref="/login" ariaLabelledBy="forgot-title" className="route-screen auth-screen" footer="Password reset requests are intentionally generic for account security.">
      <section className="auth-panel" aria-label="Forgot password form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Account</span> Recovery</p>
          <h1 id="forgot-title" className="page-title compact-title">Request a password reset.</h1>
          <p className="page-copy">Enter your login email or username to receive reset instructions.</p>
        </div>
        <form className="auth-card" onSubmit={onSubmit}>
          <label>
            Email or username
            <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="you@example.com" />
          </label>
          {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
          <button type="submit" className="button button-primary auth-submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send reset link"}
          </button>
          <p><Link href="/login">Back to login</Link></p>
        </form>
      </section>
    </PageChrome>
  );
}
