"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorTooltip({
  targetSelector,
  label = "View project",
}: {
  targetSelector: string;
  label?: string;
}) {
  const tipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tip = tipRef.current;
    if (!tip) return;

    gsap.set(tip, { opacity: 0, scale: 0, xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(tip, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(tip, "y", { duration: 0.25, ease: "power3" });

    let active: HTMLElement | null = null;

    const show = () => {
      gsap.to(tip, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.5)",
        overwrite: "auto",
      });
    };
    const hide = () => {
      gsap.to(tip, {
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest(targetSelector) as
        | HTMLElement
        | null;
      if (target) {
        if (active !== target) {
          if (active) active.classList.remove("no-cursor");
          active = target;
          active.classList.add("no-cursor");
          show();
        }
      } else if (active) {
        active.classList.remove("no-cursor");
        active = null;
        hide();
      }
    };

    const leaveWindow = () => {
      if (active) {
        active.classList.remove("no-cursor");
        active = null;
      }
      hide();
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leaveWindow);
    document.addEventListener("mouseleave", leaveWindow);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leaveWindow);
      document.removeEventListener("mouseleave", leaveWindow);
      if (active) active.classList.remove("no-cursor");
      active = null;
    };
  }, [targetSelector]);

  return (
    <div
      ref={tipRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none bg-black text-white text-xs uppercase tracking-tight font-manrope px-4 py-2 rounded-full whitespace-nowrap"
    >
      {label}
    </div>
  );
}
