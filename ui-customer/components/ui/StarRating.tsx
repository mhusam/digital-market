import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  value,
  size = 14,
  showValue = false,
  reviewCount,
  className = "",
}: StarRatingProps) {
  const filled = Math.floor(value);
  const half = value - filled >= 0.5;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < filled;
          const isHalf = i === filled && half;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="text-[#1B1B1B]/20 absolute inset-0"
                strokeWidth={2.2}
              />
              {(isFilled || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? size / 2 : size }}
                >
                  <Star
                    size={size}
                    className="text-[#0EA5E9] fill-[#0EA5E9]"
                    strokeWidth={2.2}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-[12px] font-black text-[#1B1B1B]">
          {value.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-[#1B1B1B]/60 font-semibold"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
