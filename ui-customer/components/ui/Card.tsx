import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
  hover = false,
}: CardProps) {
  return (
    <Tag
      className={`bg-white rounded-3xl shadow-[0_8px_28px_-12px_rgba(17,24,39,0.18)] border border-[#1B1B1B]/5 ${
        hover ? "card-lift" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
