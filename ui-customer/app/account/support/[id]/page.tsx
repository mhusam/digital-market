"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTicket, replyToTicket } from "@digital-market/api-client";
import type { SupportTicket } from "@digital-market/shared-types";
import { Badge } from "../../../../components/ui/Badge";
import { Button } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { EmptyState } from "../../../../components/ui/EmptyState";
import { Skeleton } from "../../../../components/ui/LoadingSkeleton";
import {
  formatDateTime,
  priorityTone,
  ticketLabel,
  ticketTone,
} from "../../../../lib/account";
import { toast } from "../../../../store/toastStore";

const TEXTAREA_CLASS =
  "mt-1.5 min-h-[140px] w-full rounded-[24px] border-2 border-transparent bg-[#F8FBFF] px-4 py-3 text-sm font-semibold text-[#1B1B1B] focus:border-[#1B1B1B]";

export default function AccountSupportDetailPage() {
  const params = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await getTicket(params.id);
      if (cancelled) return;
      setTicket(response.data ?? null);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const onReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const response = await replyToTicket(params.id, message);
    setSaving(false);

    if (!response.success || !response.data) {
      toast.error("Reply failed", response.message);
      return;
    }

    setTicket(response.data);
    setMessage("");
    toast.success("Reply sent", "Your support conversation has been updated.");
  };

  if (loading) {
    return <Skeleton className="h-[680px] rounded-[32px]" />;
  }

  if (!ticket) {
    return (
      <Card className="p-6 md:p-7">
        <EmptyState
          title="Ticket not found"
          description="This support thread is not available for the current customer session."
          ctaHref="/account/support"
          ctaLabel="Back to support"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
              Support detail
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
              {ticket.subject}
            </h2>
            <p className="mt-3 text-sm font-semibold text-[#1B1B1B]/68">
              Created {formatDateTime(ticket.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={ticketTone[ticket.status]}>
              {ticketLabel[ticket.status]}
            </Badge>
            <Badge tone={priorityTone[ticket.priority]}>{ticket.priority}</Badge>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#1B1B1B]/7 bg-[#F8FBFF] px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Original request
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-[#1B1B1B]/76">
            {ticket.message}
          </p>
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
          Conversation
        </p>
        <div className="mt-5 space-y-4">
          {ticket.replies.map((reply) => (
            <div
              key={reply.id}
              className={`rounded-[28px] px-5 py-5 ${
                reply.isStaff
                  ? "bg-[#1B1B1B] text-white"
                  : "border border-[#1B1B1B]/7 bg-[#F8FBFF] text-[#1B1B1B]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] font-black uppercase tracking-[0.14em]">
                  {reply.isStaff ? "Support team" : "You"}
                </p>
                <p className={`text-xs font-semibold ${reply.isStaff ? "text-white/72" : "text-[#1B1B1B]/58"}`}>
                  {formatDateTime(reply.createdAt)}
                </p>
              </div>
              <p className={`mt-3 text-sm font-semibold leading-7 ${reply.isStaff ? "text-white/88" : "text-[#1B1B1B]/76"}`}>
                {reply.message}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <form onSubmit={onReply} className="space-y-4">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
              Reply
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Keep the thread moving
            </h3>
          </div>

          {ticket.status === "closed" ? (
            <div className="rounded-2xl border border-[#2563EB]/25 bg-[#EEF4FF] px-4 py-3 text-[13px] font-semibold text-[#1E3A8A]">
              This ticket is closed. Open a new support request if you still need help.
            </div>
          ) : (
            <>
              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={TEXTAREA_CLASS}
                  required
                />
              </label>
              <Button type="submit" size="lg" disabled={saving}>
                {saving ? "Sending..." : "Send reply"}
              </Button>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}
