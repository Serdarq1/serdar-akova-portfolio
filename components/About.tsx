"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const domeRef = useRef<HTMLDivElement | null>(null);
  const primaryRef = useRef<HTMLParagraphElement | null>(null);
  const secondaryRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dome = domeRef.current;
    if (!root || !dome) return;

    let ctx: gsap.Context | null = null;

    const id = window.setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          dome,
          { height: 0 },
          {
            height: () => Math.round(window.innerHeight * 0.12),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "top 20%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        [primaryRef.current, secondaryRef.current].forEach((el) => {
          if (!el) return;
          const words = el.querySelectorAll<HTMLElement>(".about-word");
          gsap.set(words, { opacity: 0.12 });
          gsap.to(words, {
            opacity: 1,
            ease: "power2.out",
            stagger: 0.035,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, root);

      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, []);

  const primary =
    "I'm Serdar Akova, a web developer and digital designer crafting fast, scalable, and immersive digital experiences that merge a minimal, luxury aesthetic with engineering precision.";
  const secondary =
    "I specialize in high-end projects, editorial layouts, and interactive 3D web experiences using technologies like Next.js, TypeScript, Tailwind CSS, and Three.js.";

  const splitWords = (s: string) =>
    s.split(" ").map((w, i) => (
      <span key={i} className="about-word inline-block pr-[0.28em]">
        {w}
      </span>
    ));

  return (
    <section id="about" ref={rootRef} className="relative w-full">
      <div
        ref={domeRef}
        className="absolute left-0 w-full pointer-events-none overflow-hidden"
        style={{ bottom: "100%", height: 0 }}
        aria-hidden
      >
        <svg
          className="w-full h-full block"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
        >
          <path d="M 0 50 Q 50 -50 100 50 Z" fill="#0f0e0c" />
        </svg>
      </div>

      <div className="relative min-h-screen w-full bg-[#0f0e0c] text-white px-6 py-32 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center font-manrope tracking-tight">
          <p ref={primaryRef} className="text-2xl md:text-4xl leading-tight">
            {splitWords(primary)}
          </p>
          <p
            ref={secondaryRef}
            className="mt-10 text-lg md:text-2xl leading-snug text-white/40"
          >
            {splitWords(secondary)}
          </p>
        </div>
      </div>
    </section>
  );
}
