"use client";

import { useState } from "react";
import { EVENTS } from "@/lib/mockData";
import { Calendar, Clock, MapPin, Users, Check, Sparkles, PlusCircle } from "lucide-react";
import { toast } from "sonner";

export default function EventsPage() {
  const [rsvpedList, setRsvpedList] = useState<string[]>([]);

  const handleRsvp = (id: string, title: string) => {
    if (rsvpedList.includes(id)) {
      setRsvpedList(rsvpedList.filter((x) => x !== id));
      toast.success(`Cancelled RSVP for ${title}`);
    } else {
      setRsvpedList([...rsvpedList, id]);
      toast.success(`RSVP confirmed for ${title}! We added this to your calendar.`);
    }
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Live Broadcasts</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Webinars & Meetups.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Participate in interactive SaaS design showcases, Q&A panels with framework leads, and community coding sessions.
        </p>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EVENTS.map((event) => {
          const hasRsvped = rsvpedList.includes(event.id);
          const totalRsvps = event.rsvpCount + (hasRsvped ? 1 : 0);

          return (
            <div
              key={event.id}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Event card glow backdrop */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent-electric)]/5 to-[var(--accent-violet)]/5 blur-xl pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Interactive Live Session
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-[var(--accent-electric)] transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                {/* Info block */}
                <div className="space-y-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-primary shrink-0" />
                    <span>Date: {event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary shrink-0" />
                    <span>Time: {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary shrink-0" />
                    <span>Location: {event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-primary shrink-0" />
                    <span className="tabular-nums">RSVPs: {totalRsvps} builders</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleRsvp(event.id, event.title)}
                  className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    hasRsvped
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                      : "bg-primary text-primary-foreground hover:bg-primary/95"
                  }`}
                >
                  {hasRsvped ? (
                    <>
                      <Check className="size-4" />
                      RSVP Confirmed
                    </>
                  ) : (
                    <>
                      <PlusCircle className="size-4" />
                      Reserve My Spot
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
