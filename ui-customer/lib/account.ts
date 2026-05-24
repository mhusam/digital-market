import type {
  SupportTicket,
} from "@digital-market/shared-types";

type UiOrderStatus = "paid" | "pending" | "processing" | "cancelled" | "refunded";
type UiPaymentStatus = "paid" | "pending" | "failed" | "refunded";
type UiTicketStatus =
  | "open"
  | "in_progress"
  | "waiting_on_customer"
  | "resolved"
  | "closed";

export const orderTone: Record<UiOrderStatus, "success" | "warn" | "danger"> = {
  paid: "success",
  pending: "warn",
  processing: "warn",
  cancelled: "danger",
  refunded: "danger",
};

export const paymentTone: Record<
  UiPaymentStatus,
  "success" | "warn" | "danger"
> = {
  paid: "success",
  pending: "warn",
  failed: "danger",
  refunded: "danger",
};

export const ticketTone: Record<
  UiTicketStatus,
  "success" | "warn" | "danger" | "ink"
> = {
  open: "ink",
  in_progress: "warn",
  waiting_on_customer: "danger",
  resolved: "success",
  closed: "danger",
};

export const ticketLabel: Record<UiTicketStatus, string> = {
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

export function getTicketTone(status: string): "success" | "warn" | "danger" | "ink" {
  return ticketTone[status as UiTicketStatus] ?? "ink";
}

export function getTicketLabel(status: string): string {
  return ticketLabel[status as UiTicketStatus] ?? formatStatusLabel(status);
}

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
