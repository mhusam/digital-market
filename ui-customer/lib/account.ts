import type {
  OrderStatus,
  PaymentStatus,
  SupportTicket,
  TicketStatus,
} from "@digital-market/shared-types";

export const orderTone: Record<OrderStatus, "success" | "warn" | "danger"> = {
  paid: "success",
  pending: "warn",
  processing: "warn",
  cancelled: "danger",
  refunded: "danger",
};

export const paymentTone: Record<
  PaymentStatus,
  "success" | "warn" | "danger"
> = {
  paid: "success",
  pending: "warn",
  failed: "danger",
  refunded: "danger",
};

export const ticketTone: Record<
  TicketStatus,
  "success" | "warn" | "danger" | "ink"
> = {
  open: "ink",
  in_progress: "warn",
  waiting_on_customer: "danger",
  resolved: "success",
  closed: "danger",
};

export const ticketLabel: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  waiting_on_customer: "Waiting on you",
  resolved: "Resolved",
  closed: "Closed",
};

export const priorityTone: Record<
  SupportTicket["priority"],
  "warn" | "danger" | "ink"
> = {
  low: "warn",
  medium: "ink",
  high: "danger",
  urgent: "danger",
};

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatStatusLabel(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
