"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Key, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // Basic password strength meter calculation
  const strength = (() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid password reset token.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Password reset complete! Log in with your new credentials.");
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-32 bg-gradient-to-bl from-[var(--accent-violet)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-1">
        <span className="eyebrow text-[var(--accent-violet)]">Security Recovery</span>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Reset password.
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Provide your new account credentials. Ensure it contains numbers and special symbols.
        </p>
      </div>

      {!token ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center space-y-3">
          <p className="text-xs font-semibold text-red-500">
            No recovery token detected. Please request a new recovery link.
          </p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-1 text-xs font-bold text-foreground underline"
          >
            Forgot Password <ArrowRight className="size-3.5" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)]/50 focus:border-[var(--accent-violet)]"
              />
              <Lock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            </div>
            {/* Strength indicator */}
            {password.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="flex gap-1.5 h-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-full transition-all ${
                        i < strength
                          ? strength <= 2
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-muted-foreground">
                  Strength: {strength <= 2 ? "Moderate" : "Strong"}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)]/50 focus:border-[var(--accent-violet)]"
              />
              <Key className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
          >
            {submitting ? (
              <div className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
            ) : (
              <>
                <Check className="size-4" />
                Update Password
              </>
            )}
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t border-border">
        <Link
          href="/login"
          className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel &amp; return to login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      <Suspense fallback={
        <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-12 text-center space-y-4">
          <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Loading reset form...
          </p>
        </div>
      }>
        <ResetPasswordFormContent />
      </Suspense>
    </div>
  );
}
