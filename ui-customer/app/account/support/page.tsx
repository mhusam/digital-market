"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createTicket, getOrders, getTickets } from "@digital-market/api-client";
import type { Order, SupportTicket } from "@digital-market/shared-types";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/LoadingSkeleton";
import { NativeSelect } from "../../../components/ui/NativeSelect";
import {
  formatDate,
  priorityTone,
  ticketLabel,
  ticketTone,
} from "../../../lib/account";
import { toast } from "../../../store/toastStore";

const INPUT_CLASS =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-transparent bg-[#F8FBFF] px-4 text-sm font-bold text-[#1B1B1B] focus:border-[#1B1B1B]";
const TEXTAREA_CLASS =
  "mt-1.5 min-h-[150px] w-full rounded-[24px] border-2 border-transparent bg-[#F8FBFF] px-4 py-3 text-sm font-semibold text-[#1B1B1B] focus:border-[#1B1B1B]";

export default function AccountSupportPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<SupportTicket["priority"]>("medium");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const [ordersResponse, ticketsResponse] = await Promise.all([
        getOrders(),
        getTickets(),
      ]);
      if (cancelled) return;
      setOrders(ordersResponse.data ?? []);
      setTickets(ticketsResponse.data ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const attachedOrder = orders.find((order) => order.id === orderId);
    const response = await createTicket({
      subject,
      message,
      priority,
      orderId: orderId || undefined,
      productId: attachedOrder?.items[0]?.productId,
    });
    setSaving(false);

    if (!response.success || !response.data) {
      toast.error("Ticket could not be created", response.message);
      return;
    }

    setTickets((current) => [response.data as SupportTicket, ...current]);
    setSubject("");
    setMessage("");
    setPriority("medium");
    setOrderId("");
    toast.success("Support ticket created", response.data.subject);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-7">
        <div className="max-w-2xl">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Support
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            Open a ticket when a file, payment, or setup flow needs help.
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
              Subject
            </span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className={INPUT_CLASS}
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <NativeSelect
              label="Priority"
              wrapperClassName="mt-1.5"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as SupportTicket["priority"])
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </NativeSelect>
            <NativeSelect
              label="Related order"
              wrapperClassName="mt-1.5"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
            >
              <option value="">No order attached</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id} · {order.items[0]?.product?.title ?? "Product"}
                </option>
              ))}
            </NativeSelect>
          </div>

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
            {saving ? "Sending..." : "Create ticket"}
          </Button>
        </form>
      </Card>

      <Card className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
              Ticket history
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Existing conversations
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-[28px]" />
            ))
          ) : tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/account/support/${ticket.id}`}
                className="block rounded-[28px] border border-[#1B1B1B]/7 bg-[#F8FBFF] px-5 py-4 transition-colors hover:bg-[#F8FBFF]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={ticketTone[ticket.status]}>
                    {ticketLabel[ticket.status]}
                  </Badge>
                  <Badge tone={priorityTone[ticket.priority]}>{ticket.priority}</Badge>
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/42">
                    Updated {formatDate(ticket.updatedAt)}
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-black tracking-[-0.02em]">
                  {ticket.subject}
                </h4>
                <p className="mt-2 text-sm font-semibold text-[#1B1B1B]/68 line-clamp-2">
                  {ticket.message}
                </p>
              </Link>
            ))
          ) : (
            <EmptyState
              title="No support tickets"
              description="When a customer needs help, their support history will start here."
            />
          )}
        </div>
      </Card>
    </div>
  );
}
