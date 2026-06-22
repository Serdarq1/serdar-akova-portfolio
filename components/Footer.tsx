"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#projects" },
  { label: "Contact", href: "mailto:serdar.akova5@gmail.com" },
];

const externalLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
];

const FooterLink = ({
  href,
  children,
  size = "sm",
}: {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "base";
}) => (
  <a
    href={href}
    className={`footer-reveal group relative inline-flex items-center gap-2 w-fit uppercase tracking-tight font-manrope ${
      size === "sm" ? "text-sm" : "text-base"
    } text-black/85 hover:text-black transition-colors duration-300`}
  >
    <span className="relative inline-block overflow-hidden">
      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full"
      >
        {children}
      </span>
    </span>
    <svg
      aria-hidden
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-0 -translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
    >
      <path d="M3 9L9 3M9 3H4M9 3V8" />
    </svg>
  </a>
);

export default function Footer() {
  const rootRef = useRef<HTMLElement | null>(null);
  const bigRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const big = bigRef.current;
    if (!root || !big) return;

    let ctx: gsap.Context | null = null;
    const startId = window.setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.from(".footer-reveal", {
          y: 24,
          opacity: 0,
          stagger: 0.07,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
          },
        });

        const chars = big.querySelectorAll<HTMLElement>(".big-char");
        gsap.from(chars, {
          yPercent: 110,
          stagger: 0.04,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
          },
        });

        gsap.fromTo(
          big,
          { yPercent: 55 },
          {
            yPercent: 28,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      }, root);
    }, 300);

    return () => {
      window.clearTimeout(startId);
      ctx?.revert();
    };
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative w-full bg-[#f4f1ea] text-gray-900 overflow-hidden pt-20"
    >
      <div className="px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="grid grid-cols-2 gap-y-5">
          {navLinks.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          {externalLinks.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
          <FooterLink href="mailto:serdar.akova5@gmail.com" size="base">
            serdar.akova5@gmail.com
          </FooterLink>
        </div>
      </div>

      <div
        ref={bigRef}
        className="mt-12 text-center font-eb-garamond font-medium text-black select-none whitespace-nowrap leading-[0.85]"
        style={{
          fontSize: "clamp(2.5rem, 13vw, 15rem)",
          letterSpacing: "-0.04em",
          transform: "translateY(28%)",
        }}
      >
        {"SERDAR AKOVA".split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span className="big-char inline-block will-change-transform">
              {ch === " " ? " " : ch}
            </span>
          </span>
        ))}
      </div>
    </footer>
  );
}
