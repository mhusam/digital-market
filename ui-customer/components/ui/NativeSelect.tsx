import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type NativeSelectVariant = "field" | "soft" | "pill" | "search";

interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  arrowClassName?: string;
  variant?: NativeSelectVariant;
}

const variantClasses: Record<
  NativeSelectVariant,
  { wrapper: string; select: string; arrow: string }
> = {
  field: {
    wrapper:
      "h-12 w-full rounded-2xl border-2 border-transparent bg-[#F8FBFF] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] hover:bg-[#EFF6FF] focus-within:border-[#1B1B1B] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#38BDF8]/20",
    select: "pl-4 pr-12 text-sm font-bold text-[#1B1B1B]",
    arrow: "right-2 size-8 rounded-full bg-white text-[#1E40AF] shadow-[inset_0_0_0_1px_rgba(30,64,175,0.1)]",
  },
  soft: {
    wrapper:
      "h-11 w-full rounded-2xl border-2 border-transparent bg-[#EFF6FF] hover:bg-[#EAF3FF] focus-within:border-[#1B1B1B] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#38BDF8]/20",
    select: "pl-4 pr-12 text-sm font-bold text-[#1B1B1B]",
    arrow: "right-2 size-7 rounded-full bg-white/90 text-[#1E40AF] shadow-[inset_0_0_0_1px_rgba(30,64,175,0.1)]",
  },
  pill: {
    wrapper:
      "h-9 min-w-[176px] rounded-full border border-transparent bg-[#F8FBFF] hover:bg-[#EFF6FF] focus-within:border-[#1E40AF]/35 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#38BDF8]/20",
    select: "pl-3 pr-10 text-sm font-black text-[#0F172A]",
    arrow: "right-1.5 size-7 rounded-full bg-white text-[#1E40AF] shadow-[inset_0_0_0_1px_rgba(30,64,175,0.1)]",
  },
  search: {
    wrapper:
      "h-12 w-full rounded-full border border-transparent bg-[#F8FBFF] hover:bg-[#EFF6FF] focus-within:border-[#1E40AF]/35 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#38BDF8]/20 sm:w-auto sm:bg-transparent sm:hover:bg-[#EFF6FF]",
    select: "pl-4 pr-11 text-sm font-bold text-[#1B1B1B]",
    arrow: "right-1.5 size-8 rounded-full bg-white/90 text-[#1E40AF] shadow-[inset_0_0_0_1px_rgba(30,64,175,0.1)]",
  },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(
    {
      children,
      label,
      labelClassName,
      wrapperClassName,
      arrowClassName,
      className,
      variant = "field",
      ...rest
    },
    ref,
  ) {
    const classes = variantClasses[variant];
    const control = (
      <span
        className={cx(
          "group relative flex items-center transition-all duration-200",
          classes.wrapper,
          wrapperClassName,
        )}
      >
        <select
          ref={ref}
          className={cx(
            "h-full w-full appearance-none rounded-[inherit] bg-transparent outline-none transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-55",
            classes.select,
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-transform duration-200 group-focus-within:rotate-180",
            classes.arrow,
            arrowClassName,
          )}
        >
          <ChevronDown size={16} strokeWidth={2.8} />
        </span>
      </span>
    );

    if (!label) return control;

    return (
      <label className="block">
        <span
          className={cx(
            "block text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60",
            labelClassName,
          )}
        >
          {label}
        </span>
        {control}
      </label>
    );
  },
);
