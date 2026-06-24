"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import CursorTooltip from "./CursorTooltip";

type Card = {
  slug: string;
  label: string;
  tags: string[];
  image?: string;
  dualImages?: [string, string];
  accent: string;
};

const cards: Card[] = [
  {
    slug: "shining-brows-website",
    label: "Shining Brows Website",
    tags: ["Next.js", "Tailwind", "Three.js", "GSAP", "Lenis"],
    image: "/shiningbrows_website_hero.png",
    accent: "linear-gradient(135deg,#e6dccd,#c8b89e)",
  },
  {
    slug: "shining-brows-app",
    label: "Shining Brows App",
    tags: ["Mobile-first PWA", "Flask", "JavaScript", "HTML", "CSS", "Tailwind"],
    image: "/sb_expert_app_home.png",
    accent: "linear-gradient(135deg,#d8cdb8,#b59f7e)",
  },
  {
    slug: "velora",
    label: "Velora",
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Supabase",
      "Clerk",
      "Iyzico",
      "Tailwind",
      "Framer Motion",
    ],
    image: "/velora_home.png",
    accent: "linear-gradient(135deg,#cdd6ff,#a4b3ff)",
  },
  {
    slug: "eymen-karadeniz-portfolio",
    label: "Eymen Karadeniz Portfolio",
    tags: [
      "JavaScript",
      "HTML",
      "CSS",
      "Three.js",
      "GSAP",
      "Lenis",
      "Framer Motion",
    ],
    image: "/eymen_hero.png",
    accent: "linear-gradient(135deg,#dfe7df,#b0c1b0)",
  },
  {
    slug: "social-media-growth",
    label: "Social Media Growth",
    tags: [
      "TikTok 0 → 51K",
      "11M reach in 3 months",
      "Instagram 118K → 152K",
      "Reach 700K → 11M",
      "Fully organic",
    ],
    dualImages: ["/ig_followers.png", "/tiktok_followers.png"],
    accent: "linear-gradient(135deg,#f3d6e0,#dca0b8)",
  },
];

export default function AllWork() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const headline = headlineRef.current;
    if (!root || !headline) return;

    let ctx: gsap.Context | null = null;
    const startId = window.setTimeout(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 220, filter: "blur(22px)", opacity: 0.25 },
        {
          y: 0,
          filter: "blur(0px)",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: headline,
            start: "top 95%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".allwork-card").forEach((card) => {
        const tags = card.querySelectorAll<HTMLElement>(".allwork-tag");
        gsap.set(tags, { opacity: 0, y: -10 });
        card.addEventListener("mouseenter", () => {
          gsap.to(tags, {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(tags, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power3.in",
          });
        });
      });
    }, root);
    }, 300);

    return () => {
      window.clearTimeout(startId);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="all-work"
      ref={rootRef}
      className="relative w-full bg-[#f4f1ea] text-black overflow-hidden"
    >
      <div className="min-h-screen flex items-center justify-center px-6">
        <h2
          ref={headlineRef}
          className="font-instrument-serif text-center text-[clamp(2.5rem,9vw,10rem)] leading-[0.95] tracking-[-0.04em] max-w-[1500px]"
        >
          Creating digital products
          <br />
          that are made <span className="text-indigo-600 ">to last.</span>
        </h2>
      </div>

      <div className="px-12 pb-32">
        <div className="flex items-end justify-between mb-10">
          <h3 className="font-manrope uppercase tracking-tight text-sm text-black/60">
            All Work
          </h3>
          <p className="font-instrument-serif max-w-md text-black/75 text-lg leading-relaxed tracking-tight">
            A selection of recent products, editorial sites, 3D experiences, and
            growth campaigns. Design, engineering, and brand built end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:flex md:flex-row md:gap-4 md:w-full md:h-[60vh]">
          {cards.map((c, i) => (
            <Link
              key={i}
              href={`/work/${c.slug}`}
              className="allwork-card group relative rounded-[2rem] overflow-hidden cursor-pointer h-[55vh] md:h-auto md:flex-1 block"
              style={{
                background: c.accent,
                transition: "flex 0.7s cubic-bezier(0.25,1,0.5,1)",
              }}
              onMouseEnter={(e) => {
                if (window.innerWidth >= 768)
                  e.currentTarget.style.flex = "3";
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth >= 768)
                  e.currentTarget.style.flex = "1";
              }}
            >
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover object-top"
                />
              )}
              {c.dualImages && (
                <div className="absolute inset-0 grid grid-rows-2 gap-1">
                  {c.dualImages.map((src, di) => (
                    <div key={di} className="relative overflow-hidden">
                      <Image
                        src={src}
                        alt={`${c.label} ${di === 0 ? "Instagram" : "TikTok"}`}
                        fill
                        sizes="(min-width: 768px) 35vw, 90vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35 pointer-events-none" />

              <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2 z-10">
                {c.tags.map((t, ti) => (
                  <span
                    key={ti}
                    className="allwork-tag inline-block bg-white/15 backdrop-blur-md border border-white/30 text-white text-[11px] tracking-tight font-manrope px-3 py-1 rounded-full w-fit"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6 font-manrope text-white text-sm uppercase tracking-tight z-10">
                {c.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CursorTooltip targetSelector=".allwork-card" />
    </section>
  );
}
