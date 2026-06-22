"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const bgRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const bg = bgRef.current;
    const text = textRef.current;
    const cursor = cursorRef.current;
    if (!btn || !bg || !text || !cursor) return;

    gsap.set(bg, { backgroundColor: "rgba(255,255,255,0.6)" });
    gsap.set(text, { color: "#0f0e0c" });
    gsap.set(cursor, {
      opacity: 0,
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    });

    const hoverTl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.45, ease: "power3.out" },
    });
    hoverTl
      .to(bg, { backgroundColor: "#0f0e0c" }, 0)
      .to(text, { color: "#f4f1ea" }, 0);

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const enter = (e: MouseEvent) => {
      hoverTl.play();
      btn.style.cursor = "none";
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    };
    const leave = () => {
      hoverTl.reverse();
      btn.style.cursor = "";
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "power3.in",
        overwrite: "auto",
      });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousemove", move);
      hoverTl.kill();
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-5 sm:px-8 md:px-12 py-4 md:py-6 flex items-center justify-between font-manrope text-[0.72rem] sm:text-[0.78rem] tracking-tight backdrop-blur-xl bg-white/30 border-b border-black/5">
        <a
          href="#top"
          className="uppercase tracking-tight font-medium text-black"
        >
          Serdar Akova
        </a>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-black">
          {[
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 uppercase tracking-tight"
            >
              <span className="inline-block w-[5px] h-[5px] rounded-full border border-black/50 group-hover:bg-black transition-colors" />
              <span className="relative">
                {link.label}
                <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          ))}
        </nav>

        <a
          ref={btnRef}
          href="mailto:serdar.akova5@gmail.com"
          className="relative inline-flex items-center rounded-full px-4 sm:px-6 py-2 sm:py-2.5 uppercase tracking-tight overflow-hidden whitespace-nowrap border border-black/10"
        >
          <span
            ref={bgRef}
            aria-hidden
            className="absolute inset-0 rounded-full backdrop-blur-md"
          />
          <span ref={textRef} className="relative z-10">
            Contact
          </span>
        </a>
      </header>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center w-9 h-9 rounded-full bg-black text-white"
        aria-hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
