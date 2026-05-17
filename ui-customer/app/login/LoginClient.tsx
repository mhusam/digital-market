"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login as loginCustomer, mockCustomers } from "@digital-market/api-client";
import { AuthShell } from "../../components/account/AuthShell";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

const INPUT_CLASS =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-transparent bg-[#F8FBFF] px-4 text-sm font-bold text-[#1B1B1B] focus:border-[#1B1B1B]";

export function LoginClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const commitLogin = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [password, setPassword] = useState("demo-password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [hydrated, isAuthenticated, nextPath, router]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const response = await loginCustomer({ email, password });
    setLoading(false);

    if (!response.success || !response.data) {
      const message = response.message ?? "Login failed.";
      setError(message);
      toast.error("Login failed", message);
      return;
    }

    commitLogin(response.data.user);
    toast.success("Welcome back", `Signed in as ${response.data.user.displayName}.`);
    router.push(nextPath);
  };

  return (
    <AuthShell
      eyebrow="Login"
      title="Return to your downloads, orders, and support inbox."
      description="Forge customer auth is mocked for this prototype, but the route structure and account flows follow the product plan in docs.md."
      footer={
        <span>
          New here?{" "}
          <Link href="/register" className="font-black text-[#1B1B1B] underline underline-offset-4">
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Sign in
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            Access your customer account
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
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={INPUT_CLASS}
            placeholder="Any password works in mock mode"
            required
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-[#2563EB]/25 bg-[#EEF4FF] px-4 py-3 text-[13px] font-semibold text-[#1E3A8A]">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <Link href="/forgot-password" className="text-[#1B1B1B]/72 underline underline-offset-4">
            Forgot password?
          </Link>
          <span className="text-[#1B1B1B]/55">Mock password accepted</span>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-8 rounded-[28px] bg-[#F8FBFF] px-5 py-5">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
          Seed accounts
        </p>
        <div className="mt-3 space-y-2">
          {mockCustomers.slice(0, 3).map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => setEmail(customer.email)}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left transition-colors hover:bg-[#EAF3FF]"
            >
              <span>
                <span className="block text-sm font-black">{customer.displayName}</span>
                <span className="block text-[13px] font-semibold text-[#1B1B1B]/62">
                  {customer.email}
                </span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/45">
                Load
              </span>
            </button>
          ))}
        </div>
      </div>
    </AuthShell>
  );
}
