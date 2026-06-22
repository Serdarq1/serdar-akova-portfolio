"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorTooltip from "./CursorTooltip";
import Image from "next/image";

const Placeholder = ({ label, accent }: { label: string; accent: string }) => (
  <div className="w-full h-full flex items-center justify-center" style={{ background: accent }}>
    <span className="font-manrope text-xs uppercase tracking-tight text-black/40">
      {label}
    </span>
  </div>
);

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    if (!root || !sheet) return;

    let ctx: gsap.Context | null = null;
    const id = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          sheet,
          { scale: 0.74, borderRadius: 56 },
          { scale: 1, borderRadius: 0, duration: 0.3, ease: "none" },
          0,
        );
        tl.to(
          sheet,
          { scale: 0.74, borderRadius: 56, duration: 0.3, ease: "none" },
          0.7,
        );
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
      id="projects"
      ref={rootRef}
      className="relative w-full bg-[#0f0e0c] py-32 overflow-hidden"
    >
      <div
        ref={sheetRef}
        className="relative mx-auto w-screen min-h-screen bg-white p-8 md:p-14 flex items-center origin-center"
        style={{ willChange: "transform, border-radius" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          <div className="project-card relative overflow-hidden rounded-3xl shadow-2xl shadow-black/10 h-[70vh] md:h-[80vh] cursor-pointer bg-[#f4f1ea]">
            <a href="https://serdar-akova-portfolio.vercel.app/work/shining-brows-app">
              <Image
              src="/shiningbrows_app_mainscreen.png"
              alt="Shining Brows App"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
              priority
            />
            </a>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 h-[70vh] md:h-[80vh]">
            <div className="project-card relative overflow-hidden rounded-3xl shadow-2xl shadow-black/10 flex-1 cursor-pointer">
              <a href="https://serdar-akova-portfolio.vercel.app/work/velora">
                <Image
                src="/velora_calendar.png"
                alt="Velora"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
              </a>
            </div>
            <div className="project-card relative overflow-hidden rounded-3xl shadow-2xl shadow-black/10 flex-1 cursor-pointer">
              <a href="https://serdar-akova-portfolio.vercel.app/work/shining-brows-website">
                <Image
                src="/shiningbrows_website_hero.png"
                alt="Shining Brows Website"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
              </a>
            </div>
          </div>
        </div>
      </div>

      <CursorTooltip targetSelector=".project-card" />
    </section>
  );
}
