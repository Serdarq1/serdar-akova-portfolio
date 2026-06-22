"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    title: "Website Design",
    body: "Brand-led websites engineered for clarity, speed, and a premium feel. Custom typography, scroll-linked motion, and meticulous attention to layout and white space. Every detail tuned to read as high-end across every breakpoint.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <circle cx="6" cy="6.5" r="0.6" fill="currentColor" />
        <circle cx="8.5" cy="6.5" r="0.6" fill="currentColor" />
        <circle cx="11" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Product Development & Design",
    body: "End-to-end product systems from concept through shipping code. Multi-tenant architecture, role-based access, real-time features, and subscription billing. Built so the product feels handcrafted at scale and holds up under real usage from real customers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="11" height="11" rx="2" />
        <rect x="9" y="9" width="11" height="11" rx="2" />
      </svg>
    ),
  },
  {
    title: "Full Stack Development",
    body: "Next.js, TypeScript, Python, and modern infrastructure for high-performance products. Auth, payments, databases, and APIs wired with the same care given to the front end. Fast, reliable, and built to age well.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6l-5 6 5 6" />
        <path d="M15 6l5 6-5 6" />
      </svg>
    ),
  },
  {
    title: "Social Media Management",
    body: "Cohesive visual identity, editorial content systems, and data-driven growth strategy for brands that want to compound. From content calendars and ad creatives to Meta Ads campaigns. Grew a single account from 700K to 11M monthly reach in three months.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7.5 7.5L11 16.5" />
        <path d="M16.5 7.5L13 16.5" />
        <path d="M8 6h8" />
      </svg>
    ),
  },
];

export default function Expertise() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const totalSlides = items.length + 1;

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    let ctx: gsap.Context | null = null;
    const id = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const totalScroll = () => track.scrollWidth - window.innerWidth;

        gsap.set(track, { filter: "blur(18px)", opacity: 0.55 });

        gsap.to(track, {
          filter: "blur(0px)",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });

        gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const bar = progressRef.current;
              if (bar) bar.style.width = `${self.progress * 100}%`;
            },
          },
        });
      }, root);
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden bg-black text-white"
    >
      <div
        ref={trackRef}
        className="relative z-10 h-full flex flex-nowrap"
        style={{ width: `${(items.length + 1) * 100}vw` }}
      >
        <div className="w-screen h-full shrink-0 flex flex-col items-start justify-center px-16 text-left">
          <h2
            className="font-eb-garamond font-medium leading-[0.95]"
            style={{
              fontSize: "clamp(3rem, 11vw, 12rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="italic font-normal pr-[0.02em]">W</span>hat{" "}
            <span className="italic font-light">I</span>{" "}
            <span className="italic font-normal pr-[0.02em]">D</span>o
          </h2>
          <p className="mt-10 font-manrope text-base md:text-lg text-white/65 tracking-tight max-w-2xl leading-relaxed">
            Over the past few years I've shipped production-ready marketing websites, a live multi-tenant SaaS platform, and end-to-end product systems for clients across beauty and tech. I work across the full stack, from animated interfaces and design systems to APIs, auth, and subscription billing, pairing a clean, conversion-focused aesthetic with engineering that's already serving real paying customers.
          </p>
          <span className="mt-12 inline-flex items-center gap-3 font-manrope text-xs tracking-tight text-white/40">
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M1 5h26M22 1l5 4-5 4" />
            </svg>
          </span>
        </div>

        {items.map((it, i) => (
          <div
            key={i}
            className="w-screen h-full shrink-0 flex items-center px-16"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/80">
                  <span className="w-6 h-6 block">{it.icon}</span>
                </span>
                <p className="font-manrope text-xs uppercase tracking-tight text-white/40">
                  0{i + 1} / 0{totalSlides - 1}
                </p>
              </div>
              <h3 className="font-manrope text-5xl md:text-7xl tracking-tight leading-[0.95]">
                {it.title}
              </h3>
              <div className="h-px bg-white/20 my-8 w-2/3" />
              <p className="font-manrope text-base md:text-lg text-white/65 tracking-tight leading-relaxed">
                {it.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-55 left-0 right-0 z-20 px-16 flex items-center gap-8">
        <span className="font-manrope text-xs uppercase tracking-tight text-white/45 whitespace-nowrap">
          Expertise
        </span>
        <div className="relative flex-1 h-px bg-white/12">
          {Array.from({ length: totalSlides - 1 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/20"
              style={{ left: `${((i + 1) / totalSlides) * 100}%` }}
            />
          ))}
          <div
            ref={progressRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-white"
            style={{
              width: "0%",
              boxShadow:
                "0 0 8px rgba(255,255,255,0.85), 0 0 18px rgba(255,255,255,0.45), 0 0 32px rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
