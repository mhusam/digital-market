"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Loader2, Mail, Lock, ShieldCheck, Chrome, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("customer@local.sellonline");
  const [password, setPassword] = useState("Test@123");
  const [loading, setLoading] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Validating demo credentials from AGENTS.md
      if (email === "customer@local.sellonline" && password === "Test@123") {
        login({
          id: "customer-1",
          name: "John Builder",
          email: "customer@local.sellonline",
          role: "CUSTOMER",
        });
        toast.success("Successfully logged in! Accessing profile...");
        router.push("/account");
      } else {
        setShouldShake(true);
        toast.error("Invalid credentials. Try customer@local.sellonline / Test@123");
        setTimeout(() => setShouldShake(false), 500);
      }
    }, 1000);
  };

  const handleOAuth = (provider: string) => {
    toast.success(`Redirecting to ${provider} authentication provider...`);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32 flex justify-center">
      {/* Shake style definition injected inline */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .shake-class {
          animation: shake 0.4s ease-in-out;
        }
      `}} />

      <div className={`w-full max-w-md rounded-2xl border border-border bg-card p-8 space-y-6 ${shouldShake ? "shake-class" : ""}`}>
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="eyebrow text-[var(--accent-electric)]">Sign In Gate</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Developer Login.
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access bought boilerplates, presets, and customized license parameters.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
              <Mail className="absolute left-3.5 top-3.5 size-3.5 text-muted-foreground" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Password</label>
              <Link href="/forgot-password" className="text-[9px] font-bold text-[var(--accent-electric)] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
              <Lock className="absolute left-3.5 top-3.5 size-3.5 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center">
          <span className="absolute inset-x-0 h-px bg-border" />
          <span className="relative bg-card px-3 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Or Connect With</span>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => handleOAuth("Google")}
            className="h-11 rounded-xl border border-border bg-muted/30 hover:bg-muted font-bold text-xs flex items-center justify-center gap-2 text-foreground transition-colors cursor-pointer"
          >
            <Chrome className="size-4 text-red-500" />
            Sign in with Google
          </button>
        </div>

        {/* Setup Redirect helper */}
        <div className="text-center text-[10px] text-muted-foreground font-semibold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[var(--accent-electric)] hover:underline font-bold">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
