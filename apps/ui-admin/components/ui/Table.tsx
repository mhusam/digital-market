import { cn } from "@/lib/cn";
import type { ReactNode, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  /** Row hover + left accent for clickable rows */
  interactive?: boolean;
}

export function Table({ children, className, interactive, ...rest }: TableProps) {
  return (
    <div className="table-scroll">
      <table className={cn("admin-table", interactive && "admin-table--interactive", className)} {...rest}>
        {children}
      </table>
    </div>
  );
}

export function ThSortButton({
  children,
  sorted,
  onClick,
}: {
  children: ReactNode;
  sorted?: false | "asc" | "desc";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button type="button" onClick={onClick} className="th-sort" data-sorted={sorted || undefined}>
      <span>{children}</span>
      <span className="th-sort-icons" aria-hidden>
        <span className={sorted === "asc" ? "opacity-100" : "opacity-30"}>↑</span>
        <span className={sorted === "desc" ? "opacity-100" : "opacity-30"}>↓</span>
      </span>
    </button>
  );
}

export function Th({ className, numeric, ...rest }: ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return <th className={cn(numeric && "cell-numeric", className)} {...rest} />;
}

export function Td({ className, numeric, muted, ...rest }: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean; muted?: boolean }) {
  return <td className={cn(numeric && "cell-numeric", muted && "cell-muted", className)} {...rest} />;
}
