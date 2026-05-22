"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { customerResetPassword } from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const response = await customerResetPassword(token, password);
    setSubmitting(false);
    setMessage(response.data?.message ?? response.message ?? "Reset completed.");
  };

  return (
    <PageChrome activeHref="/login" ariaLabelledBy="reset-title" className="route-screen auth-screen" footer="Password reset applies only with a valid reset token.">
      <section className="auth-panel" aria-label="Reset password form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Account</span> Reset</p>
          <h1 id="reset-title" className="page-title compact-title">Set a new password.</h1>
          <p className="page-copy">Provide your new password to regain account access.</p>
        </div>
        <form className="auth-card" onSubmit={onSubmit}>
          <label>
            New password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" />
          </label>
          {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
          <button type="submit" className="button button-primary auth-submit" disabled={submitting || !token}>
            {submitting ? "Saving..." : "Reset password"}
          </button>
          <p><Link href="/login">Back to login</Link></p>
        </form>
      </section>
    </PageChrome>
  );
}
