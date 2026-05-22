import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | PROGMAN",
  description: "A simple, curated calendar of upcoming tech events.",
};

interface EventItem {
  day: string;
  month: string;
  year: string;
  weekday: string;
  title: string;
  blurb: string;
  location: string;
  format: "In-Person" | "Virtual" | "Hybrid";
  tags: string[];
  href: string;
}

const EVENTS: EventItem[] = [
  {
    day: "14",
    month: "May",
    year: "2026",
    weekday: "Thu",
    title: "Google I/O",
    blurb: "Annual keynote covering Android, Gemini, and the developer roadmap.",
    location: "Online",
    format: "Virtual",
    tags: ["Mobile", "Web", "AI"],
    href: "#",
  },
  {
    day: "12",
    month: "Jun",
    year: "2026",
    weekday: "Fri",
    title: "React Summit",
    blurb: "Three days of talks on the state of React and its surrounding ecosystem.",
    location: "Amsterdam, NL",
    format: "Hybrid",
    tags: ["React", "Frontend"],
    href: "#",
  },
  {
    day: "26",
    month: "Jun",
    year: "2026",
    weekday: "Fri",
    title: "Figma Config",
    blurb: "Figma's product conference. Design systems, plugins, and craft.",
    location: "San Francisco, CA",
    format: "Hybrid",
    tags: ["Design", "UI/UX"],
    href: "#",
  },
  {
    day: "18",
    month: "Aug",
    year: "2026",
    weekday: "Tue",
    title: "KubeCon + CloudNativeCon",
    blurb: "The largest gathering of the cloud-native and Kubernetes community.",
    location: "London, UK",
    format: "In-Person",
    tags: ["Kubernetes", "Cloud"],
    href: "#",
  },
  {
    day: "24",
    month: "Oct",
    year: "2026",
    weekday: "Sat",
    title: "Next.js Conf",
    blurb: "Vercel's annual developer conference on the future of the web.",
    location: "San Francisco, CA",
    format: "Hybrid",
    tags: ["Next.js", "React"],
    href: "#",
  },
  {
    day: "30",
    month: "Nov",
    year: "2026",
    weekday: "Mon",
    title: "AWS re:Invent",
    blurb: "Five days of keynotes, sessions, and certifications across the AWS stack.",
    location: "Las Vegas, NV",
    format: "In-Person",
    tags: ["Cloud", "DevOps"],
    href: "#",
  },
];

const FILTERS = ["All", "Virtual", "In-Person", "Hybrid"] as const;

export default function EventsPage() {
  return (
    <div className="page-container py-12 md:py-16">
      <header className="border-y border-foreground py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Calendar</span>
          <span className="text-foreground">May 2026 – Dec 2026</span>
          <span>Updated weekly</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          Events
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          A short, edited list of upcoming conferences, summits, and meetups worth the calendar block.
        </p>
      </header>

      <nav className="my-8 flex flex-wrap items-center gap-2 border-b border-[var(--hairline)] pb-6 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="mr-2 text-muted-foreground">Filter</span>
        {FILTERS.map((f, i) => (
          <button
            key={f}
            type="button"
            className={
              i === 0
                ? "rounded-full bg-foreground px-3 py-1 text-background"
                : "rounded-full border border-[var(--hairline)] px-3 py-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            }
          >
            {f}
          </button>
        ))}
      </nav>

      <main>
        <ul className="flex flex-col">
          {EVENTS.map((event) => (
            <li
              key={event.title}
              className="border-b border-[var(--hairline)] last:border-b-0"
            >
              <Link
                href={event.href}
                className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-8 md:grid-cols-[140px_1fr_auto] md:gap-x-10"
              >
                <div className="flex flex-col items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {event.weekday}
                  </span>
                  <span className="mt-1 text-5xl font-extrabold leading-none tracking-tight text-foreground md:text-6xl">
                    {event.day}
                  </span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
                    {event.month} · {event.year}
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground underline-offset-4 group-hover:underline md:text-3xl">
                    {event.title}
                  </h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                    {event.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-foreground">{event.location}</span>
                    <span>·</span>
                    <span>{event.format}</span>
                    <span>·</span>
                    <span>{event.tags.join(" / ")}</span>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1 md:self-center">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground underline-offset-4 group-hover:underline">
                    Details
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>End of list</span>
        <span>Next refresh · Monday 06:00 ET</span>
      </footer>
    </div>
  );
}
