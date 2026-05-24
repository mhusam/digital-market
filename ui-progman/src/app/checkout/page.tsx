"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { CreditCard, ShoppingBag, CheckCircle, Loader2, ArrowRight, ShieldCheck, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, subtotal, discount, clearCart } = useCartStore();
  const [step, setStep] = useState<"billing" | "payment" | "success">("billing");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "bank">("paypal");
  const [email, setEmail] = useState("customer@local.sellonline");
  const [name, setName] = useState("John Builder");

  const [orderId] = useState(() => `SO-${Math.floor(10000000 + Math.random() * 90000000)}`);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "billing") {
      if (!name || !email) {
        toast.error("Please fill in billing details");
        return;
      }
      setStep("payment");
    }
  };

  const handleProcessPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      toast.success("Order processed successfully!");
      // We clear cart upon successful simulation
      clearCart();
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="page-container pt-12 pb-24 sm:pb-32 flex flex-col items-center justify-center text-center max-w-xl">
        <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle className="size-8" />
        </div>
        <span className="eyebrow text-emerald-500 mb-2">Order Confirmed</span>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-3">
          Thank you for your purchase!
        </h1>
        <p className="text-muted-foreground text-xs leading-relaxed mb-6">
          Your order reference is <span className="font-mono font-bold text-foreground">{orderId}</span>. The digital assets license downloads have been credited to your account profile dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Link
            href="/account"
            className="h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all"
          >
            Access My Downloads
          </Link>
          <Link
            href="/products"
            className="h-11 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Secure Gate</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Checkout Gateway.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Follow steps to configure license owner credentials, select payment gateways, and confirm purchase details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Steps Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step indicator header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex size-6 items-center justify-center rounded-full text-[10px] font-extrabold border transition-colors ${
                step === "billing"
                  ? "bg-[var(--accent-electric)] border-[var(--accent-electric)] text-white"
                  : "bg-primary border-primary text-primary-foreground"
              }`}>1</span>
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                step === "billing" ? "text-[var(--accent-electric)]" : "text-foreground"
              }`}>Billing</span>
            </div>
            <span className="h-px w-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className={`inline-flex size-6 items-center justify-center rounded-full text-[10px] font-extrabold border transition-colors ${
                step === "payment"
                  ? "bg-[var(--accent-electric)] border-[var(--accent-electric)] text-white"
                  : "bg-muted border-border text-muted-foreground"
              }`}>2</span>
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                step === "payment" ? "text-[var(--accent-electric)]" : "text-muted-foreground"
              }`}>Payment</span>
            </div>
          </div>

          {step === "billing" ? (
            <form onSubmit={handleNextStep} className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">License Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
                >
                  Continue to Payment
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep("billing")}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Choose Gateway</h3>
              </div>

              {/* Radio Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "paypal" ? "border-[var(--accent-electric)] bg-[var(--accent-electric)]/5" : "border-border hover:border-foreground/10 bg-muted/30"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="gateway"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="accent-[var(--accent-electric)]"
                    />
                    <div>
                      <span className="font-bold text-xs text-foreground block">PayPal Portal</span>
                      <span className="text-[9px] text-muted-foreground block mt-0.5">Instant license keys capture</span>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </label>

                <label className={`rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "bank" ? "border-[var(--accent-electric)] bg-[var(--accent-electric)]/5" : "border-border hover:border-foreground/10 bg-muted/30"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="gateway"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="accent-[var(--accent-electric)]"
                    />
                    <div>
                      <span className="font-bold text-xs text-foreground block">Bank Wire</span>
                      <span className="text-[9px] text-muted-foreground block mt-0.5">Manual confirmation reference</span>
                    </div>
                  </div>
                  <CreditCard className="size-4 text-muted-foreground" />
                </label>
              </div>

              {paymentMethod === "paypal" ? (
                <div className="rounded-xl border border-border bg-muted/40 p-5 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By confirming, a secure sandbox PayPal billing window will verify checkout parameters before capturing transactions.
                  </p>
                  <button
                    onClick={handleProcessPayment}
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-[var(--accent-electric)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[var(--accent-electric)]/95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Connecting Secure PayPal...
                      </>
                    ) : (
                      <>
                        Pay with PayPal
                        <ExternalLink className="size-3.5" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-muted/40 p-5 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Transfer the total sum to our registered bank account. Make sure to reference the code <span className="font-mono font-bold text-foreground">{orderId}</span> to verify manual approvals.
                  </p>
                  <div className="space-y-1.5 text-xs text-muted-foreground border-t border-b border-border py-3">
                    <div className="flex justify-between"><span className="font-bold">Bank Name</span><span>Union Dev Bank</span></div>
                    <div className="flex justify-between"><span className="font-bold">IBAN</span><span>DE89 3704 0044 0532 0130 00</span></div>
                    <div className="flex justify-between"><span className="font-bold">BIC</span><span>WELADED1MXX</span></div>
                  </div>
                  <button
                    onClick={handleProcessPayment}
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Confirming Bank Wire...
                      </>
                    ) : (
                      <>
                        Confirm Bank Transfer
                        <CheckCircle className="size-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Order Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <ShoppingBag className="size-4 text-[var(--accent-electric)]" />
              Summary
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">Order ID: {orderId.split("-")[1]}</span>
          </div>

          {items.length > 0 ? (
            <div className="space-y-4 border-b border-border pb-4 max-h-48 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-foreground block">{item.title}</span>
                    <span className="text-[9px] text-muted-foreground uppercase">{item.licenseType || "Commercial"}</span>
                  </div>
                  <span className="font-mono text-foreground font-bold shrink-0">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Cart is empty.</p>
          )}

          <div className="space-y-2 text-xs font-semibold text-muted-foreground border-b border-border pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-foreground">${subtotal().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[var(--accent-electric)]">
                <span>Discount</span>
                <span className="font-mono">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-mono text-foreground">$0.00</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-sm">
            <span>Amount Due</span>
            <span className="font-mono text-[var(--accent-electric)] text-lg">${total().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
