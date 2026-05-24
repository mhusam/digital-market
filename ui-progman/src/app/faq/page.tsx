"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FaqPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "What is included inside a single developer license?",
      a: "Every single purchase includes a single developer seat with lifetime code access, repository clones, and free framework upgrades. You are permitted to build and host unlimited personal or client SaaS projects.",
    },
    {
      q: "How do I configure Supabase and Stripe bindings locally?",
      a: "Our Next.js 16 templates read all parameters from .env files. Make sure to copy the .env.example files inside apps directory, then spin up local databases using Docker compose scripts detailed inside AGENTS.md.",
    },
    {
      q: "Do you offer manual bank transfer verification support?",
      a: "Yes! Create a checkout order with Bank Transfer gateway selected. Wire funds referencing the SO code, and mail billing details to support for manual approval audits.",
    },
    {
      q: "Can I upgrade from single developer seat to enterprise logs?",
      a: "Absolutely. Contact our developer support channel to arrange team licenses, custom docker registry keys, and dedicated developer support.",
    },
  ];

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32 max-w-3xl">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">FAQ Center</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Common Questions.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Verify framework specs, license rules, payment procedures, and S3 asset delivery credentials.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300"
            >
              {/* Question Trigger */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:bg-muted/10 cursor-pointer select-none"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="size-4.5 text-[var(--accent-electric)] shrink-0" />
                  {faq.q}
                </span>
                {isExpanded ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </button>

              {/* Answer Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-1 border-t border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground leading-relaxed pt-4 whitespace-pre-wrap">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
