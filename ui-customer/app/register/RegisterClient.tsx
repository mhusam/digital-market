"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerCustomer } from "@digital-market/api-client";
import { AuthShell } from "../../components/account/AuthShell";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

const INPUT_CLASS =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-transparent bg-[#F8FBFF] px-4 text-sm font-bold text-[#1B1B1B] focus:border-[#1B1B1B]";

export function RegisterClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const commitLogin = useAuthStore((state) => state.login);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const response = await registerCustomer({
      firstName,
      lastName,
      email,
      password,
    });
    setLoading(false);

    if (!response.success || !response.data) {
      const message = response.message ?? "Registration failed.";
      setError(message);
      toast.error("Could not create account", message);
      return;
    }

    commitLogin(response.data.user);
    toast.success("Account created", "Your Forge customer area is ready.");
    router.push(nextPath);
  };

  return (
    <AuthShell
      eyebrow="Register"
      title="Create a customer account that owns your purchases."
      description="New customer accounts start clean so you can review empty-state behavior for orders, downloads, and support before backend integration."
      footer={
        <span>
          Already have an account?{" "}
          <Link href="/login" className="font-black text-[#1B1B1B] underline underline-offset-4">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Create account
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            Start your Forge account
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
              First name
            </span>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={INPUT_CLASS}
              required
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
              Last name
            </span>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={INPUT_CLASS}
              required
            />
          </label>
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

        <label className="block">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={INPUT_CLASS}
            minLength={6}
            placeholder="At least 6 characters"
            required
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-[#2563EB]/25 bg-[#EEF4FF] px-4 py-3 text-[13px] font-semibold text-[#1E3A8A]">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
