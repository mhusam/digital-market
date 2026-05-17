import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {icon && (
        <div className="size-14 mb-4 inline-flex items-center justify-center bg-[#eef2ff] border border-[#c7d2fe] rounded-2xl text-[#3730A3]">
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      {description && <p className="text-[13px] text-[#6b6760] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
