"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { User, Key, Receipt, Download, Copy, Check, ShieldAlert, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";

interface PurchasedItem {
  id: string;
  title: string;
  licenseKey: string;
  price: number;
  date: string;
}

export default function AccountPage() {
  const { user, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"assets" | "security" | "billing">("assets");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Profile forms local state
  const [name, setName] = useState(user?.name || "John Builder");
  const [email, setEmail] = useState(user?.email || "customer@local.sellonline");
  const [password, setPassword] = useState("");

  const purchasedItems: PurchasedItem[] = [
    {
      id: "prod-1",
      title: "Velocity NextJS 16 Starter Kit",
      licenseKey: "LIC-VEL-8260-FF32-511B",
      price: 49.00,
      date: "2026-05-18",
    },
    {
      id: "prod-5",
      title: "Orbit 3D Globe Widget",
      licenseKey: "LIC-ORB-9140-AA11-4099",
      price: 15.00,
      date: "2026-05-20",
    },
  ];

  const handleCopyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    toast.success("License key copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in required fields");
      return;
    }
    // Update store state
    login({
      id: user?.id || "customer-1",
      name,
      email,
      role: user?.role || "CUSTOMER",
    });
    toast.success("Profile credentials updated successfully!");
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">Owner Dashboard</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Account Center.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Access purchase download history, copy cryptographic license keys, and configure credential details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border border-border bg-card flex items-center justify-center font-bold text-foreground">
            {user?.name.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-xs text-foreground block">{user?.name}</span>
            <span className="text-[9px] font-mono text-muted-foreground uppercase">{user?.role}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 border-b border-border pb-px">
        {[
          { id: "assets" as const, label: "My Downloads", icon: Download },
          { id: "security" as const, label: "Profile Settings", icon: User },
          { id: "billing" as const, label: "Receipts Log", icon: Receipt },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors -mb-px ${
                isActive
                  ? "border-[var(--accent-electric)] text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === "assets" && (
        <div className="space-y-6">
          {purchasedItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-foreground/15 transition-all duration-300"
            >
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <span className="text-[10px] text-muted-foreground font-semibold">Purchased on {item.date}</span>
                </div>

                {/* Key copy code block */}
                <div className="flex items-center gap-2 border border-border rounded-xl bg-muted/50 p-2 pl-4 max-w-sm">
                  <Key className="size-3.5 text-muted-foreground shrink-0" />
                  <div className="flex-1 font-mono text-[10px] font-bold text-foreground tracking-wider select-all overflow-x-auto whitespace-nowrap">
                    {item.licenseKey}
                  </div>
                  <button
                    onClick={() => handleCopyKey(item.id, item.licenseKey)}
                    className="h-8 px-3 rounded-lg bg-card border border-border hover:bg-muted font-bold text-[10px] uppercase tracking-wider text-foreground flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-muted-foreground" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={() => toast.success(`Simulating download for ${item.title} ZIP bundle...`)}
                  className="w-full md:w-auto h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="size-3.5" />
                  Download Bundle (.ZIP)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "security" && (
        <form onSubmit={handleSaveProfile} className="max-w-xl rounded-2xl border border-border bg-card p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Update Details</h3>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">New Password (optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/30 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Save className="size-3.5" />
              Save Updates
            </button>
          </div>
        </form>
      )}

      {activeTab === "billing" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-muted-foreground border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-foreground">Date</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-foreground">Transaction ID</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-foreground">Total Price</th>
                  <th className="p-4 text-right text-[10px] uppercase tracking-wider font-bold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {purchasedItems.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="p-4 text-foreground">{item.date}</td>
                    <td className="p-4 font-mono text-[10px]">TXN-{item.licenseKey.substring(8, 12)}</td>
                    <td className="p-4 font-mono text-foreground font-bold">${item.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toast.success(`Generating PDF invoice for TXN-${item.licenseKey.substring(8, 12)}...`)}
                        className="inline-flex h-8 px-3 rounded-lg border border-border hover:bg-muted font-bold text-[10px] uppercase tracking-wider text-foreground items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Receipt className="size-3 text-muted-foreground" />
                        Invoice PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
