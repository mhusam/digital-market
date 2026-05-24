"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Loader2, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Support ticket created!");
    }, 1200);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-12">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Support Channel</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Contact Engineering.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Need licensing help, billing custom parameters, or custom corporate deployment features? Drop us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info Grid Left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <h3 className="text-base font-bold text-foreground">Communication Lines</h3>
            <div className="space-y-4 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-border bg-muted/30">
                  <Mail className="size-4 text-[var(--accent-electric)]" />
                </div>
                <span>support@sellonline.local</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-border bg-muted/30">
                  <Phone className="size-4 text-[var(--accent-violet)]" />
                </div>
                <span>+1 (800) 555-DEV-KIT</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-border bg-muted/30">
                  <MapPin className="size-4 text-blue-500" />
                </div>
                <span>Remote / Distributed</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-5 text-xs text-muted-foreground leading-relaxed">
            <p>
              * Typical response times for standard developer questions is under 24 hours. Enterprise contract clients benefit from dedicated slack/discord workspace support channels.
            </p>
          </div>
        </div>

        {/* Message Form Right */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-6">
              <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-6" />
              </div>
              <div className="space-y-2">
                <span className="eyebrow text-emerald-500">Ticket Dispatched</span>
                <h3 className="text-base font-bold text-foreground">Support Ticket Logged</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We logged message details successfully. A developer representative will respond to your registered email soon.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="h-11 px-4 rounded-xl border border-border hover:bg-muted text-xs font-bold transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Your Name</label>
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

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Message Body</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 p-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Dispatching ticket...
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
