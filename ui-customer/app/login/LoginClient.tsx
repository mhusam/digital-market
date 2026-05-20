"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileArchive,
  Headphones,
  LockKeyhole,
  Mail,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { login as loginCustomer, mockCustomers } from "@digital-market/api-client";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

const INPUT_CLASS =
  "h-full w-full rounded-[18px] border border-[#D9E3EA] bg-white/88 px-12 text-[15px] font-extrabold text-[#0F172A] shadow-[0_14px_30px_-26px_rgba(15,23,42,0.7)] transition-colors placeholder:text-[#64748B]/62 focus:border-[#2563EB] focus:bg-white";

const ACCOUNT_TOOLS = [
  {
    title: "Downloads",
    detail: "3 ready files",
    icon: Download,
    tone: "bg-[#DBEAFE] text-[#1E40AF]",
  },
  {
    title: "Orders",
    detail: "Invoices synced",
    icon: ReceiptText,
    tone: "bg-[#CCFBF1] text-[#0F766E]",
  },
  {
    title: "Support",
    detail: "Priority inbox",
    icon: Headphones,
    tone: "bg-[#E0F2FE] text-[#0369A1]",
  },
];

const SESSION_CHECKS = [
  "Paid purchases unlock private files",
  "Invoices and receipts stay attached",
  "Support history follows every order",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function LoginClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const commitLogin = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [password, setPassword] = useState("demo-password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <section className="relative min-h-[calc(100svh-96px)] overflow-hidden px-5 py-6 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1220px] gap-5 lg:grid-cols-[1.03fr_0.97fr]">
        <div className="relative order-2 min-h-[620px] overflow-hidden rounded-[34px] border border-white/72 bg-[#0F172A] p-5 text-white shadow-[0_34px_90px_-44px_rgba(15,23,42,0.9)] md:p-6 lg:order-1">
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(37,99,235,0.38), transparent 42%), linear-gradient(165deg, transparent 50%, rgba(13,148,136,0.32))",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" aria-hidden />

          <div className="relative flex h-full flex-col">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-3 rounded-[22px] border border-white/12 bg-white/10 px-3 py-2 text-[15px] font-black text-white shadow-[0_14px_32px_-26px_rgba(255,255,255,0.5)] backdrop-blur-xl transition-colors hover:bg-white/16"
            >
              <span
                className="inline-flex size-9 items-center justify-center rounded-[15px] bg-[linear-gradient(135deg,#38BDF8,#2563EB)] text-white shadow-[0_16px_28px_-16px_rgba(56,189,248,0.8)]"
                aria-hidden
              >
                ◆
              </span>
              Forge
            </Link>

            <div className="mt-10 max-w-[580px] md:mt-12">
              <h1 className="max-w-[620px] text-[clamp(2.45rem,5vw,4.35rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                Access your customer account
              </h1>
              <p className="mt-4 max-w-[520px] text-[16px] font-semibold leading-7 text-white/72 md:text-[17px]">
                Continue to your downloads, orders, and support workspace.
              </p>
            </div>

            <div className="relative mt-8 grid gap-4 md:grid-cols-3">
              {ACCOUNT_TOOLS.map(({ title, detail, icon: Icon, tone }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-white/12 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
                >
                  <span className={`inline-flex size-10 items-center justify-center rounded-[16px] ${tone}`}>
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  <h2 className="mt-3 text-base font-black tracking-[-0.02em] text-white">
                    {title}
                  </h2>
                  <p className="mt-1 text-[13px] font-bold text-white/58">{detail}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-auto pt-8">
              <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[28px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-[18px] bg-white text-[#0F172A]">
                      <FileArchive size={20} strokeWidth={2.4} />
                    </span>
                    <div>
                      <p className="text-[13px] font-black uppercase tracking-[0.12em] text-white/48">
                        Latest unlock
                      </p>
                      <h2 className="mt-1 text-lg font-black tracking-[-0.02em]">
                        SaaS CRM Starter
                      </h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {["source.zip", "license.pdf", "invoice-1048.pdf"].map((item, index) => (
                      <div
                        key={item}
                        className={`items-center justify-between rounded-[18px] bg-white/[0.08] px-3 py-3 text-sm font-bold text-white/78 ${
                          index === 2 ? "hidden 2xl:flex" : "flex"
                        }`}
                      >
                        <span>{item}</span>
                        <span className="text-white/42">{index === 0 ? "42 MB" : "PDF"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/12 bg-[#F8FBFF] p-4 text-[#0F172A] shadow-[0_24px_58px_-34px_rgba(15,23,42,0.85)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[12px] font-black uppercase tracking-[0.13em] text-[#64748B]">
                        Session check
                      </p>
                      <h2 className="mt-1 text-xl font-black tracking-[-0.03em]">
                        Ready after sign in
                      </h2>
                    </div>
                    <span className="inline-flex size-11 items-center justify-center rounded-[18px] bg-[#CCFBF1] text-[#0F766E]">
                      <ShieldCheck size={21} strokeWidth={2.4} />
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {SESSION_CHECKS.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-[13px] font-extrabold text-[#334155]">
                        <CheckCircle2 size={16} className="text-[#0D9488]" strokeWidth={2.5} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 rounded-[34px] border border-white/78 bg-white/82 p-5 shadow-[0_34px_82px_-48px_rgba(15,23,42,0.72)] backdrop-blur-2xl md:p-6 lg:order-2 lg:min-h-[620px]">
          <div className="flex min-h-full flex-col">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
                  Customer sign in
                </p>
                <h2 className="mt-2 max-w-[420px] text-4xl font-black leading-[0.94] tracking-[-0.05em] text-[#0F172A] md:text-[2.65rem]">
                  Continue where you left off.
                </h2>
              </div>
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-[20px] bg-[#E0F2FE] text-[#0369A1] sm:inline-flex">
                <PackageCheck size={23} strokeWidth={2.4} />
              </span>
            </div>

            <p className="mt-4 text-sm font-bold text-[#64748B]">
              New to Forge?{" "}
              <Link href="/register" className="font-black text-[#0F172A] underline underline-offset-4 transition-colors hover:text-[#1E40AF]">
                Create an account
              </Link>
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.13em] text-[#475569]">
                  Email
                </span>
                <span className="relative mt-2 block h-[54px]">
                  <Mail
                    size={19}
                    strokeWidth={2.3}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    aria-hidden
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={INPUT_CLASS}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.13em] text-[#475569]">
                  Password
                </span>
                <span className="relative mt-2 block h-[54px]">
                  <LockKeyhole
                    size={19}
                    strokeWidth={2.3}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    aria-hidden
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${INPUT_CLASS} pr-14`}
                    placeholder="Any password works in mock mode"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-[14px] text-[#64748B] transition-colors hover:bg-[#EAF3FF] hover:text-[#0F172A] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2.4} /> : <Eye size={18} strokeWidth={2.4} />}
                  </button>
                </span>
              </label>

              {error && (
                <div className="rounded-[20px] border border-[#2563EB]/22 bg-[#EFF6FF] px-4 py-3 text-[13px] font-bold text-[#1E40AF]">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
                <Link href="/forgot-password" className="text-[#0F172A]/72 underline underline-offset-4 transition-colors hover:text-[#0F172A]">
                  Forgot password?
                </Link>
                <span className="inline-flex items-center gap-2 text-[#64748B]">
                  <CheckCircle2 size={16} className="text-[#0D9488]" strokeWidth={2.5} />
                  Mock password accepted
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-[#1E40AF] px-6 text-[15px] font-black text-white shadow-[0_22px_42px_-24px_rgba(30,64,175,0.95)] transition hover:bg-[#1E3A8A] hover:shadow-[0_24px_48px_-24px_rgba(30,64,175,1)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight size={18} strokeWidth={2.6} aria-hidden />
              </button>
            </form>

            <div className="mt-5 rounded-[26px] border border-[#DDE6EA] bg-[#F8FBFF]/78 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[12px] font-black uppercase tracking-[0.14em] text-[#475569]">
                  Seed accounts
                </h3>
                <span className="text-[12px] font-extrabold text-[#64748B]">Demo data</span>
              </div>
              <div className="mt-3 space-y-2">
                {mockCustomers.slice(0, 3).map((customer) => {
                  const selected = customer.email === email;

                  return (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => setEmail(customer.email)}
                      className={`group flex w-full items-center gap-3 rounded-[20px] border px-3.5 py-2.5 text-left transition ${
                        selected
                          ? "border-[#2563EB]/32 bg-white shadow-[0_18px_34px_-28px_rgba(37,99,235,0.9)]"
                          : "border-transparent bg-white/64 hover:border-[#D9E3EA] hover:bg-white"
                      }`}
                      aria-pressed={selected}
                    >
                      <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-[16px] text-sm font-black ${
                        selected ? "bg-[#DBEAFE] text-[#1E40AF]" : "bg-[#E7EEF1] text-[#334155]"
                      }`}>
                        {getInitials(customer.displayName)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black text-[#0F172A]">
                          {customer.displayName}
                        </span>
                        <span className="block truncate text-[13px] font-semibold text-[#64748B]">
                          {customer.email}
                        </span>
                      </span>
                      <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-[13px] transition ${
                        selected
                          ? "bg-[#1E40AF] text-white"
                          : "bg-[#EAF3FF] text-[#2563EB] group-hover:bg-[#DBEAFE]"
                      }`}>
                        <ArrowRight size={15} strokeWidth={2.6} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
