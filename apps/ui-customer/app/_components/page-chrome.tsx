import type { CSSProperties, ReactNode } from "react";

export type HighlightCard = {
  label: string;
  value: string;
  detail: string;
  position: string;
};

type PageChromeProps = {
  activeHref?: string;
  ariaLabelledBy: string;
  children: ReactNode;
  className?: string;
  footer?: string;
  highlights?: HighlightCard[];
  intro?: "home" | "page";
};

export function PageChrome({
  children,
  footer,
  highlights = [],
}: PageChromeProps) {
  return (
    <>
      {children}

      {highlights.length > 0 ? (
        <section className="card-stage" aria-label="Marketplace highlights">
          {highlights.map((card, index) => (
            <article
              key={card.label}
              className={`preview-card ${card.position}`}
              style={{ "--card-index": index } as CSSProperties}
            >
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.detail}</span>
            </article>
          ))}
        </section>
      ) : null}

      {footer ? <p className="footer-note">{footer}</p> : null}
    </>
  );
}
