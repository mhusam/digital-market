"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Mail, Lock, ArrowRight } from "lucide-react";
import { adminLogin } from "@digital-market/api-client";
import { useAdminStore } from "@/store/adminStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminStore((s) => s.login);
  const [loginField, setLoginField] = useState("admin@local.sellonline");
  const [password, setPassword] = useState("Test@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await adminLogin({ email: loginField, password });
    setLoading(false);
    if (!res.success || !res.data) {
      setError(res.message ?? "Invalid credentials.");
      toast.error(res.message ?? "Login failed");
      return;
    }
    login(res.data.user, res.data.token ?? "");
    toast.success(`Welcome back, ${res.data.user.name}`);
    router.replace("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink relative overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute -top-32 -right-32 size-[420px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, #4F46E5 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-[420px] mx-4">
        <div className="flex items-center gap-3 mb-7">
          <span className="size-10 inline-flex items-center justify-center bg-primary rounded-lg text-white">
            <Flame className="size-5" strokeWidth={2.4} />
          </span>
          <div>
            <div className="text-white text-[20px] font-semibold tracking-tight leading-none">Forge</div>
            <div className="text-[10.5px] uppercase tracking-[0.16em] text-white/40 mt-1">Admin Portal</div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-7 shadow-2xl shadow-black/40">
          <h1 className="text-[22px] font-semibold tracking-tight">Sign in</h1>
          <p className="text-[13.5px] text-muted mt-1">
            Restricted access. Authorized staff only.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input
              type="text"
              label="Email or Username"
              value={loginField}
              onChange={(e) => setLoginField(e.target.value)}
              leftIcon={<Mail className="size-4" />}
              placeholder="you@company.com"
              autoComplete="username"
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="size-4" />}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            {error && (
              <div className="text-[12.5px] text-[#b91c1c] bg-[#fee2e2] border border-[#ef4444]/20 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <Button type="submit" loading={loading} size="lg" className="w-full" rightIcon={<ArrowRight className="size-4" />}>
              Sign in
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-border-subtle">
            <p className="text-[11.5px] text-muted leading-relaxed">
              <span className="font-semibold text-ink">Demo:</span>{" "}
              <code className="bg-indigo-50 px-1 py-0.5 rounded text-primary-dark">admin@local.sellonline</code>{" "}
              /{" "}
              <code className="bg-indigo-50 px-1 py-0.5 rounded text-primary-dark">Test@123</code>
            </p>
          </div>
        </div>

        <p className="text-center text-[11.5px] text-white/40 mt-5">
          IT Solutions Store · Admin
        </p>
      </div>
    </div>
  );
}
