import type { OrderStatus } from "@digital-market/shared-types";

export function toCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "Pending payment",
  PAID: "Paid",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export function formatOrderStatus(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export type OrderStatusTone = "info" | "success" | "neutral" | "warning" | "danger";

export function orderStatusTone(status: OrderStatus): OrderStatusTone {
  switch (status) {
    case "PAID":
    case "FULFILLED":
      return "success";
    case "PENDING_PAYMENT":
      return "warning";
    case "CANCELLED":
      return "neutral";
    case "REFUNDED":
      return "danger";
    default:
      return "info";
  }
}

export function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function offeringTypeLabel(type: string): string {
  if (type === "PRODUCT") return "Product";
  if (type === "PROJECT") return "Project";
  if (type === "SOLUTION") return "Solution";
  return type;
}

export function slugAccent(slug: string): { hue: number; from: string; to: string } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  const hue = ((hash >>> 0) % 360 + 360) % 360;
  return {
    hue,
    from: `oklch(72% 0.14 ${hue})`,
    to: `oklch(46% 0.12 ${(hue + 38) % 360})`,
  };
}
