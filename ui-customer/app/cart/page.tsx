"use client";

import { useCartStore } from "../../store/cartStore";
import { CartItemRow } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import { CouponForm } from "../../components/checkout/CouponForm";
import { EmptyState } from "../../components/ui/EmptyState";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { toast } from "../../store/toastStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const total = useCartStore((s) => s.total());
  const discount = useCartStore((s) => s.discount);
  const couponCode = useCartStore((s) => s.couponCode);

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <EmptyState
          illustration="cart"
          title="Your cart is empty"
          description="Browse premium themes, plugins, and UI kits made by indie creators."
          ctaHref="/products"
          ctaLabel="Browse Products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <div className="mt-6 mb-10">
        <span className="eyebrow">Cart</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
          Your basket{" "}
          <span className="font-hand text-[#0EA5E9] text-3xl ml-2">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onRemove={() => {
                removeItem(item.id);
                toast.info("Removed from cart", item.title);
              }}
            />
          ))}
        </div>
        <div className="lg:col-span-4 space-y-4">
          <CouponForm cartTotal={subtotal} />
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            couponCode={couponCode}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
