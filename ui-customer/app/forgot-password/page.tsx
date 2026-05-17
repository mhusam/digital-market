"use client";

import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "@digital-market/api-client";
import { AuthShell } from "../../components/account/AuthShell";
import { Button } from "../../components/ui/Button";
import { toast } from "../../store/toastStore";

const INPUT_CLASS =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-transparent bg-[#F8FBFF] px-4 text-sm font-bold text-[#1B1B1B] focus:border-[#1B1B1B]";

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
      title="Recover access without exposing whether an email exists."
      description="The mock API intentionally behaves like a real authentication system here: reset requests always succeed to avoid leaking account information."
      footer={
        <span>
          Remembered it?{" "}
          <Link href="/login" className="font-black text-[#1B1B1B] underline underline-offset-4">
            Back to login
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Forgot password
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            Request a reset link
          </h2>
        </div>

        <label className="block">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={INPUT_CLASS}
            required
          />
        </label>

        {message && (
          <div className="rounded-2xl border border-[#14B8A6]/25 bg-[#ECFDF5] px-4 py-3 text-[13px] font-semibold text-[#166534]">
            {message}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
