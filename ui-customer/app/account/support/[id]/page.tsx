"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTicket, replyToTicket } from "@digital-market/api-client";
import type { SupportTicket } from "@digital-market/shared-types";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { EmptyState } from "../../../../components/ui/app-empty-state";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  formatDateTime,
  getTicketLabel,
  getTicketTone,
  priorityTone,
} from "../../../../lib/account";
import { toast } from "../../../../store/toastStore";

const TEXTAREA_CLASS =
  "mt-1.5 min-h-[140px] w-full rounded-[24px] border-2 border-transparent bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground focus:border-foreground";

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

  const replies = ticket.replies ?? [];

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Support detail
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
              {ticket.subject}
            </h2>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              Created {formatDateTime(ticket.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={getTicketTone(ticket.status)}>
              {getTicketLabel(ticket.status)}
            </Badge>
            <Badge tone={priorityTone[ticket.priority]}>{ticket.priority}</Badge>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-border bg-muted/40 px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Original request
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-muted-foreground">
            {ticket.message}
          </p>
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
          Conversation
        </p>
        <div className="mt-5 space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className={`rounded-[28px] px-5 py-5 ${
                reply.isStaff
                  ? "bg-foreground text-primary-foreground"
                  : "border border-border bg-muted/40 text-foreground"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] font-black uppercase tracking-[0.14em]">
                  {reply.isStaff ? "Support team" : "You"}
                </p>
                <p className={`text-xs font-semibold ${reply.isStaff ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {formatDateTime(reply.createdAt)}
                </p>
              </div>
              <p className={`mt-3 text-sm font-semibold leading-7 ${reply.isStaff ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                {reply.message}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <form onSubmit={onReply} className="space-y-4">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Reply
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Keep the thread moving
            </h3>
          </div>

          {ticket.status === "closed" ? (
            <div className="rounded-2xl border border-primary/25 bg-accent/80 px-4 py-3 text-[13px] font-semibold text-primary">
              This ticket is closed. Open a new support request if you still need help.
            </div>
          ) : (
            <>
              <label className="block">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
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
