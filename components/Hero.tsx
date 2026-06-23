"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const splineRef = useRef<SVGPathElement | null>(null);
  const splineShadowRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const headline = headlineRef.current;
    const spline = splineRef.current;
    const splineShadow = splineShadowRef.current;
    if (!root || !headline || !spline || !splineShadow) return;

    const len = spline.getTotalLength();
    spline.style.strokeDasharray = `${len}`;
    spline.style.strokeDashoffset = `${len}`;
    splineShadow.style.strokeDasharray = `${len}`;
    splineShadow.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      const words = headline.querySelectorAll<HTMLElement>(".hero-word");

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-line-vert", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.4,
        ease: "expo.inOut",
      })
        .from(
          ".hero-intro",
          { y: 20, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=1.0",
        )
        .fromTo(
          words,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.05,
          },
          "-=0.75",
        )
        .from(
          ".hero-desc",
          { y: 20, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7",
        )
        .from(
          ".hero-bio",
          { y: 20, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.75",
        )
        .from(
          ".hero-icon",
          {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.55",
        )
        .from(
          ".hero-right-anchor",
          { opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.65",
        );

      gsap.to([splineShadow, spline], {
        strokeDashoffset: 0,
        duration: 5.2,
        ease: "power2.inOut",
        delay: 0.4,
        stagger: 0.12,
        onComplete: () => {
          gsap.to([splineShadow, spline], {
            strokeDashoffset: -len,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        },
      });

      gsap.to(headline, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate min-h-screen w-full flex flex-col items-center justify-center px-6 text-black overflow-hidden"
      style={{ backgroundColor: "rgb(231, 231, 231)" }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-spline-grad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="blue" />
            <stop offset="50%" stopColor="blue" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          <filter id="hero-spline-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <path
          ref={splineShadowRef}
          d="M -80 480 C 220 480, 220 170, 540 170 C 860 170, 820 740, 1140 700 C 1380 670, 1380 880, 1540 880"
          fill="none"
          stroke="#000"
          strokeOpacity="0.06"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hero-spline-soft)"
          transform="translate(8, 22)"
        />
        <path
          ref={splineRef}
          d="M -80 480 C 220 480, 220 170, 540 170 C 860 170, 820 740, 1140 700 C 1380 670, 1380 880, 1540 880"
          fill="none"
          stroke="url(#hero-spline-grad)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.28"
        />
      </svg>

      <div className="hero-line-vert hidden md:block absolute left-12 top-28 w-px h-48 bg-black/25" />

      <span
        className="hero-right-anchor hidden md:block absolute right-10 top-1/2 font-manrope uppercase tracking-tight text-black whitespace-nowrap origin-right"
        style={{
          fontSize: "clamp(1.1rem, 1.9vw, 2rem)",
          fontWeight: 500,
          transform: "translateY(-50%) rotate(-90deg) translateX(50%)",
        }}
      >
        Serdar Akova
      </span>

      <p className="mt-20 md:mt-12 hero-intro font-manrope text-base md:text-base tracking-tight text-black mb-6 md:mb-8">
        I&apos;m Serdar Akova<span className="text-black/60">*</span>
      </p>

      <h1
        ref={headlineRef}
        className="font-eb-garamond text-center font-semibold leading-[0.95] w-full max-w-[1500px] mx-auto px-2"
        style={{
          fontSize: "clamp(3.2rem, 13.5vw, 10.5rem)",
          letterSpacing: "-0.035em",
          color: "#0f0e0c",
        }}
      >
        <span className="block overflow-hidden pb-[0.08em] mt-6 md:mt-20">
          <span className="hero-word inline-block will-change-transform">
            <span className="italic font-normal pr-[0.02em]">P</span>roduct
            Builder
          </span>
        </span>
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="hero-word inline-block will-change-transform">
            <em className="italic font-light pr-[0.05em]">&amp;</em>{" "}
            <span className="italic font-normal pr-[0.02em]">W</span>eb
            Developer
          </span>
        </span>
      </h1>

      <p className="hero-desc font-manrope mt-8 md:mt-10 max-w-2xl text-center text-black tracking-tight text-lg md:text-xl leading-snug px-4">
        who builds websites that last and products that become valuable.
      </p>

      <p className="hero-bio font-manrope mt-5 max-w-xl text-center text-black tracking-tight text-sm md:text-base leading-relaxed px-6">
        A web developer and designer specializing in premium visual storytelling. I create highly polished, scroll-driven galleries and digital spaces that showcase high-end work with total restraint and elegance.
      </p>

      <div className="hero-icons mt-8 md:mt-10 flex items-center gap-5 md:gap-6">
        <a
          aria-label="GitHub"
          href="https://github.com/Serdarq1"
          target="_blank"
          rel="noreferrer"
          className="hero-icon group inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/serdar-akova-aa5179296/"
          target="_blank"
          rel="noreferrer"
          className="hero-icon group inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
