import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/55 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent)] text-[var(--accent-ink)]",
        secondary:
          "border-white/12 bg-white/8 text-white/80",
        outline:
          "border-white/24 text-white/80",
        success:
          "border-green-500/30 bg-green-500/14 text-green-300",
        warning:
          "border-amber-500/30 bg-amber-500/14 text-amber-300",
        danger:
          "border-red-500/30 bg-red-500/14 text-red-300",
        info:
          "border-sky-500/30 bg-sky-500/14 text-sky-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
