import { formatOrderStatus, orderStatusTone } from "../_lib/format";
import type { OrderStatus } from "@digital-market/shared-types";

interface StatusPillProps {
  status: OrderStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const tone = orderStatusTone(status);
  return (
    <span className="status-pill" data-tone={tone}>
      {formatOrderStatus(status)}
    </span>
  );
}
