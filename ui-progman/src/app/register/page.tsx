"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Loader2, User, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simple password strength calculator
  const getPasswordStrength = () => {
    if (!password) return { label: "", color: "bg-border", width: "w-0" };
    if (password.length < 6) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (password.length < 10) return { label: "Medium", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.error("Please agree to the Terms of Service");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        id: `customer-${Date.now()}`,
        name,
        email,
        role: "CUSTOMER",
      });
      toast.success("Account created successfully!");
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32 flex justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="eyebrow text-[var(--accent-electric)]">Join Platform</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Create Account.
          </h1>
          <p className="text-xs text-muted-foreground">
            Register to save purchase bundles and generate keys instantly.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="John Builder"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
              <User className="absolute left-3.5 top-3.5 size-3.5 text-muted-foreground" />
            </div>
          </div>

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

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
              <Lock className="absolute left-3.5 top-3.5 size-3.5 text-muted-foreground" />
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                </div>
                <div className="flex justify-between text-[8px] font-bold text-muted-foreground uppercase">
                  <span>Strength</span>
                  <span>{strength.label}</span>
                </div>
              </div>
            )}
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-2.5 text-[10px] font-semibold text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 accent-[var(--accent-electric)]"
            />
            <span>
              I agree to the terms of service, customer download policies, and code license agreements.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Initializing Profile...
              </>
            ) : (
              <>
                Register Account
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-[10px] text-muted-foreground font-semibold">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent-electric)] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
