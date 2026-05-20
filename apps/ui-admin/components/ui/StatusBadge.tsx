import { Badge } from "./Badge";

type StatusKey =
  // Backend uppercase statuses
  | "DRAFT" | "PUBLISHED" | "ARCHIVED"
  | "PENDING_PAYMENT" | "PAID" | "FULFILLED" | "CANCELLED" | "REFUNDED"
  | "PAYPAL" | "BANK_TRANSFER"
  | "CREATED" | "CAPTURED" | "FAILED"
  // Legacy lowercase (mock sections)
  | "draft" | "published" | "archived"
  | "pending" | "processing" | "paid" | "cancelled" | "refunded" | "failed"
  | "open" | "in_progress" | "waiting_on_customer" | "resolved" | "closed"
  | "approved" | "rejected"
  | "active" | "suspended" | "banned" | "unverified"
  | "low" | "medium" | "high" | "urgent";

const map: Record<StatusKey, { tone: Parameters<typeof Badge>[0]["tone"]; label: string }> = {
  // Backend uppercase statuses (canonical)
  DRAFT: { tone: "neutral", label: "Draft" },
  PUBLISHED: { tone: "success", label: "Published" },
  ARCHIVED: { tone: "warning", label: "Archived" },
  PENDING_PAYMENT: { tone: "yellow", label: "Pending Payment" },
  PAID: { tone: "success", label: "Paid" },
  FULFILLED: { tone: "teal", label: "Fulfilled" },
  CANCELLED: { tone: "neutral", label: "Cancelled" },
  REFUNDED: { tone: "coral", label: "Refunded" },
  PAYPAL: { tone: "blue", label: "PayPal" },
  BANK_TRANSFER: { tone: "neutral", label: "Bank Transfer" },
  CREATED: { tone: "blue", label: "Created" },
  CAPTURED: { tone: "success", label: "Captured" },
  FAILED: { tone: "danger", label: "Failed" },

  // Legacy lowercase (mock sections)
  draft: { tone: "neutral", label: "Draft" },
  published: { tone: "success", label: "Published" },
  archived: { tone: "warning", label: "Archived" },

  pending: { tone: "warning", label: "Pending" },
  processing: { tone: "blue", label: "Processing" },
  paid: { tone: "success", label: "Paid" },
  cancelled: { tone: "neutral", label: "Cancelled" },
  refunded: { tone: "coral", label: "Refunded" },
  failed: { tone: "danger", label: "Failed" },

  open: { tone: "blue", label: "Open" },
  in_progress: { tone: "violet", label: "In progress" },
  waiting_on_customer: { tone: "yellow", label: "Waiting" },
  resolved: { tone: "teal", label: "Resolved" },
  closed: { tone: "neutral", label: "Closed" },

  approved: { tone: "success", label: "Approved" },
  rejected: { tone: "danger", label: "Rejected" },

  active: { tone: "success", label: "Active" },
  suspended: { tone: "warning", label: "Suspended" },
  banned: { tone: "danger", label: "Banned" },
  unverified: { tone: "neutral", label: "Unverified" },

  low: { tone: "neutral", label: "Low" },
  medium: { tone: "blue", label: "Medium" },
  high: { tone: "warning", label: "High" },
  urgent: { tone: "danger", label: "Urgent" },
};

export function StatusBadge({ status }: { status: string }) {
  const info = map[status as StatusKey] ?? { tone: "neutral" as const, label: status };
  return (
    <Badge tone={info.tone}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {info.label}
    </Badge>
  );
}
