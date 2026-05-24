"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { CartSummary } from "../../components/cart/CartSummary";
import { Breadcrumb } from "../../components/ui/route-breadcrumb";
import { EmptyState } from "../../components/ui/app-empty-state";
import { ProductCover } from "../../components/products/ProductCover";
import { formatPrice } from "../../lib/cover";
import { toast } from "../../store/toastStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const total = useCartStore((s) => s.total());
  const discount = useCartStore((s) => s.discount);
  const couponCode = useCartStore((s) => s.couponCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
        <EmptyState
          illustration="cart"
          title="Nothing to checkout"
          description="Your cart is empty. Browse products first."
          ctaHref="/products"
          ctaLabel="Browse Products"
        />
      </div>
    );
  }

  const onPay = async () => {
    if (!email) {
      toast.error("Email required", "Please enter your email to continue.");
      return;
    }
    setPaymentMessage(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const success = Math.random() > 0.1;
    setLoading(false);
    if (success) {
      const orderId = `ord_${Date.now().toString(36)}`;
      clearCart();
      router.push(`/checkout/success?order=${orderId}`);
    } else {
      const message = "Payment could not be authorized in the mock gateway. Double-check the email field and try the test card again.";
      setPaymentMessage(message);
      toast.error("Mock payment failed", message);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <div className="mt-6 mb-10">
        <span className="eyebrow">Checkout</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
          Almost there.
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          {/* Account */}
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-primary mr-2">1.</span>Account
            </h3>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-accent font-bold text-sm border-2 border-transparent focus:border-foreground"
              />
            </label>
            <p className="mt-2 text-[12px] text-muted-foreground font-semibold">
              We&apos;ll send your downloads and invoice here.
            </p>
            {user ? (
              <p className="mt-3 text-[12px] font-bold text-emerald-500">
                Signed in as {user.displayName}. Your receipt will stay attached to this mock account session.
              </p>
            ) : (
              <p className="mt-3 text-[12px] font-bold text-muted-foreground">
                Guest checkout is enabled for this phase. Enter any valid email to complete the flow.
              </p>
            )}
          </div>

          {/* Items */}
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-primary mr-2">2.</span>Items
            </h3>
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.id} className="py-3 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                    <ProductCover seed={i.productId} title={i.title} size="sm" rounded="rounded-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[15px] tracking-[-0.02em] truncate">
                      {i.title}
                    </p>
                    <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                      {i.licenseType} license
                    </p>
                  </div>
                  <span className="font-black">{formatPrice(i.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-3xl p-6 border border-border">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-primary mr-2">3.</span>Payment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-accent border-2 border-foreground">
                <CreditCard size={16} strokeWidth={2.6} />
                <span className="font-black text-sm">Credit / debit card</span>
                <span className="ml-auto text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                  Secure
                </span>
              </div>
              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                  Card number (test)
                </span>
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-accent font-bold text-sm tracking-[0.1em] border-2 border-transparent focus:border-foreground"
                />
              </label>
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                <Lock size={11} strokeWidth={2.6} /> This is a simulation. No
                real card will be charged.
              </p>
              {paymentMessage && (
                <div className="rounded-2xl border border-primary/25 bg-accent/80 px-4 py-3 text-[13px] font-semibold text-primary">
                  {paymentMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            couponCode={couponCode}
            total={total}
            onCheckout={onPay}
            loading={loading}
            ctaLabel={`Pay ${formatPrice(total)}`}
          />
        </div>
      </div>
    </div>
  );
}
