"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { CartSummary } from "../../components/cart/CartSummary";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { EmptyState } from "../../components/ui/EmptyState";
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
          <div className="bg-white rounded-3xl p-6 border border-[#1B1B1B]/5">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-[#0EA5E9] mr-2">1.</span>Account
            </h3>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-[#EFF6FF] font-bold text-sm border-2 border-transparent focus:border-[#1B1B1B]"
              />
            </label>
            <p className="mt-2 text-[12px] text-[#1B1B1B]/55 font-semibold">
              We&apos;ll send your downloads and invoice here.
            </p>
            {user ? (
              <p className="mt-3 text-[12px] font-bold text-[#14B8A6]">
                Signed in as {user.displayName}. Your receipt will stay attached to this mock account session.
              </p>
            ) : (
              <p className="mt-3 text-[12px] font-bold text-[#1B1B1B]/55">
                Guest checkout is enabled for this phase. Enter any valid email to complete the flow.
              </p>
            )}
          </div>

          {/* Items */}
          <div className="bg-white rounded-3xl p-6 border border-[#1B1B1B]/5">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-[#0EA5E9] mr-2">2.</span>Items
            </h3>
            <ul className="divide-y divide-[#1B1B1B]/8">
              {items.map((i) => (
                <li key={i.id} className="py-3 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                    <ProductCover seed={i.productId} title={i.title} size="sm" rounded="rounded-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[15px] tracking-[-0.02em] truncate">
                      {i.title}
                    </p>
                    <p className="text-[12px] font-bold text-[#1B1B1B]/60 uppercase tracking-[0.1em]">
                      {i.licenseType} license
                    </p>
                  </div>
                  <span className="font-black">{formatPrice(i.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl p-6 border border-[#1B1B1B]/5">
            <h3 className="font-black text-lg tracking-[-0.02em] mb-4">
              <span className="text-[#0EA5E9] mr-2">3.</span>Payment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#EAF3FF] border-2 border-[#1B1B1B]">
                <CreditCard size={16} strokeWidth={2.6} />
                <span className="font-black text-sm">Credit / debit card</span>
                <span className="ml-auto text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
                  Secure
                </span>
              </div>
              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
                  Card number (test)
                </span>
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-[#EFF6FF] font-bold text-sm tracking-[0.1em] border-2 border-transparent focus:border-[#1B1B1B]"
                />
              </label>
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-[#1B1B1B]/60">
                <Lock size={11} strokeWidth={2.6} /> This is a simulation. No
                real card will be charged.
              </p>
              {paymentMessage && (
                <div className="rounded-2xl border border-[#2563EB]/25 bg-[#EEF4FF] px-4 py-3 text-[13px] font-semibold text-[#1E3A8A]">
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
