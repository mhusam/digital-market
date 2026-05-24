"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Download, Mail, ArrowRight, ShieldCheck, Calendar, Receipt } from "lucide-react";
import { toast } from "sonner";

interface OrderLine {
  id: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
}

interface MockOrder {
  id: string;
  paymentReference: string;
  customerName: string;
  customerEmail: string;
  status: "PAID" | "PENDING_PAYMENT" | "FULFILLED";
  paymentMethod: string;
  createdAt: string;
  totalAmount: number;
  currency: string;
  lines: OrderLine[];
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<MockOrder | null>(null);
  const [downloadsLoaded, setDownloadsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate a realistic mock order based on token
      setOrder({
        id: `ord-${token.substring(0, 6)}`,
        paymentReference: `SO-CONF-${token.substring(0, 4).toUpperCase()}`,
        customerName: "Alex Builder",
        customerEmail: "builder@progman.dev",
        status: "PAID",
        paymentMethod: "PayPal Checkout",
        createdAt: new Date().toISOString(),
        totalAmount: 64.00,
        currency: "USD",
        lines: [
          {
            id: "line-1",
            productTitle: "Velocity NextJS 16 Starter Kit",
            quantity: 1,
            unitPrice: 49.00,
          },
          {
            id: "line-2",
            productTitle: "Orbit 3D Globe Widget",
            quantity: 1,
            unitPrice: 15.00,
          }
        ]
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [token]);

  const handleResendEmail = () => {
    toast.success("Confirmation email resent to builder@progman.dev!");
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      <div className="max-w-3xl mx-auto space-y-8">
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-4">
            <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Fetching order receipt details...
            </p>
          </div>
        ) : order ? (
          <>
            {/* Top Badge Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 size-48 bg-gradient-to-bl from-[var(--accent-electric)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    Order Confirmed!
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your transaction has been processed successfully.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={handleResendEmail}
                  className="h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted font-bold text-xs flex items-center gap-1.5 cursor-pointer text-foreground transition-colors"
                >
                  <Mail className="size-3.5" />
                  Resend Invoice
                </button>
                <button
                  onClick={() => setDownloadsLoaded(true)}
                  className="h-11 px-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="size-3.5" />
                  Access Downloads
                </button>
              </div>
            </div>

            {/* Invoice grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Info */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4 md:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <Receipt className="size-3.5 text-muted-foreground" />
                  Receipt Details
                </h3>

                <table className="w-full text-left text-xs font-semibold text-muted-foreground border-collapse">
                  <thead>
                    <tr className="border-b border-border font-bold text-foreground/80">
                      <th className="pb-2">Product Title</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {order.lines.map((line) => (
                      <tr key={line.id} className="hover:bg-muted/5">
                        <td className="py-3 pr-4 text-foreground font-bold">{line.productTitle}</td>
                        <td className="py-3 text-center tabular-nums">{line.quantity}</td>
                        <td className="py-3 text-right font-mono text-foreground">${line.unitPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border font-bold text-foreground">
                      <td colSpan={2} className="pt-3">Total Paid</td>
                      <td className="pt-3 text-right font-mono text-[13px] text-[var(--accent-electric)]">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Transaction Metadata */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-muted-foreground" />
                  Security Info
                </h3>

                <div className="space-y-3.5 text-[11px] font-semibold text-muted-foreground">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Reference Code</span>
                    <span className="font-mono text-foreground font-bold">{order.paymentReference}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Payment Method</span>
                    <span className="text-foreground font-bold">{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Transaction Date</span>
                    <span className="text-foreground font-bold flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloads drawer simulated */}
            {downloadsLoaded && (
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4 animate-fade-up">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Download className="size-3.5 text-[var(--accent-electric)]" />
                  Your Cryptographic ZIP Downloads
                </h3>
                <div className="space-y-3">
                  {order.lines.map((line) => (
                    <div
                      key={line.id}
                      className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-xs font-bold text-foreground block">{line.productTitle}</span>
                        <span className="text-[10px] text-muted-foreground">Version: 1.0.0 · ZIP archive</span>
                      </div>
                      <button
                        onClick={() => toast.success(`Starting download for ${line.productTitle}...`)}
                        className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-primary/95 transition-all"
                      >
                        <Download className="size-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 bg-muted px-4 py-2 rounded-full border border-border hover:bg-foreground hover:text-background transition-all text-xs font-bold"
              >
                Back to marketplace
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-4">
            <p className="text-sm font-semibold text-muted-foreground">Order details could not be resolved.</p>
            <Link href="/" className="inline-block text-xs font-bold text-[var(--accent-electric)] underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
