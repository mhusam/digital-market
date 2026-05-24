"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Recovery instructions sent to your email!");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="page-container pt-12 pb-24 sm:pb-32 flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center space-y-6">
          <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-6" />
          </div>
          <div className="space-y-2">
            <span className="eyebrow text-emerald-500">Dispatch Complete</span>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              Recovery Link Sent.
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We have dispatched recovery guidelines to <span className="font-semibold text-foreground">{email}</span>. Click the verification link to change password credentials.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all w-full"
            >
              <ArrowLeft className="size-3.5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32 flex justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="eyebrow text-[var(--accent-electric)]">Recovery Gate</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Forgot Password.
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your registered email address below, and we will send a password reset code.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Email address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="customer@local.sellonline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
              <Mail className="absolute left-3.5 top-3.5 size-3.5 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin text-[var(--accent-electric)]" />
                Dispatching recovery mail...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-[10px] text-muted-foreground font-semibold">
          Remember credentials?{" "}
          <Link href="/login" className="text-[var(--accent-electric)] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
