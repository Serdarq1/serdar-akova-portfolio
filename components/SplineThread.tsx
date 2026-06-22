"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplineThread() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spline-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        <filter id="spline-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d="M -50 450
           C 250 200, 500 700, 800 400
           S 1300 100, 1500 500
           S 600 1000, 200 700
           S 1100 200, 1500 850"
        fill="none"
        stroke="url(#spline-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#spline-glow)"
        opacity="0.55"
      />
    </svg>
  );
}
