"use client";

import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "@digital-market/api-client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthShell } from "../../components/account/AuthShell";
import { toast } from "../../store/toastStore";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await forgotPassword(email);
    setLoading(false);
    const nextMessage =
      response.message ?? "If an account exists, a reset link has been sent.";
    setMessage(nextMessage);
    toast.success("Reset requested", nextMessage);
  };

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Recover account access."
      description="Reset requests always succeed in mock mode to avoid account enumeration."
      footer={
        <span>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-primary">
            Back to login
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </Field>
          {message && (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              {message}
            </div>
          )}
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
