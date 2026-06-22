"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import type { Media, Project, Section } from "@/data/projects";
import { projects } from "@/data/projects";
import Footer from "./Footer";

const MediaEl = ({
  media,
  className,
  priority,
  sizes,
  fit = "cover",
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
}) => {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full ${fitClass} ${className ?? ""}`}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.alt ?? ""}
      fill
      sizes={sizes ?? "100vw"}
      className={`${fitClass} ${className ?? ""}`}
      priority={priority}
    />
  );
};

const Card = ({
  media,
  className = "",
  sizes,
}: {
  media: Media;
  className?: string;
  sizes?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#ece8df] ${className}`}
  >
    <MediaEl media={media} sizes={sizes} fit={media.fit ?? "cover"} />
  </div>
);

const renderSection = (section: Section, i: number) => {
  switch (section.kind) {
    case "fullscreen":
      return (
        <section
          key={i}
          className="project-section relative w-full h-[80vh] md:h-screen overflow-hidden bg-[#ece8df]"
        >
          <MediaEl
            media={section.media}
            sizes="100vw"
            fit={section.media.fit ?? "cover"}
          />
        </section>
      );

    case "leftBigRightStack":
      return (
        <section
          key={i}
          className="project-section grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-12"
        >
          <Card
            media={section.left}
            className="h-[70vh] md:h-[98vh] w-102"
            sizes="(min-width:768px) 50vw, 100vw"
          />
          <div className="grid grid-rows-2 gap-4 md:gap-6 h-[60vh] md:h-[85vh]">
            <Card
              media={section.right[0]}
              sizes="(min-width:768px) 50vw, 100vw"
            />
            <Card
              media={section.right[1]}
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </div>
        </section>
      );

    case "fourGrid":
      return (
        <section
          key={i}
          className="project-section grid grid-cols-2 grid-rows-[2fr_1fr] gap-4 md:gap-6 px-4 md:px-12 h-[70vh] md:h-[90vh]"
        >
          <Card
            media={section.items[0]}
            className="row-span-2"
            sizes="(min-width:768px) 50vw, 50vw"
          />
          <Card media={section.items[1]} sizes="(min-width:768px) 50vw, 50vw" />
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Card
              media={section.items[2]}
              sizes="(min-width:768px) 25vw, 25vw"
            />
            <Card
              media={section.items[3]}
              sizes="(min-width:768px) 25vw, 25vw"
            />
          </div>
        </section>
      );

    case "textImage":
      return (
        <section
          key={i}
          className={`project-section grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center px-4 md:px-12 ${
            section.reversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="max-w-xl">
            <h3 className="project-text-title font-eb-garamond text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-6 text-black">
              {section.title}
            </h3>
            <p className="project-text-body font-manrope text-base md:text-lg leading-relaxed text-black/70 tracking-tight">
              {section.body}
            </p>
          </div>
          <Card
            media={section.media}
            className="h-[55vh] md:h-[75vh]"
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </section>
      );

    case "twoTopOneBottom":
      return (
        <section key={i} className="project-section grid gap-4 md:gap-6 px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card
              media={section.top[0]}
              className="h-[45vh] md:h-[55vh]"
              sizes="(min-width:768px) 50vw, 100vw"
            />
            <Card
              media={section.top[1]}
              className="h-[45vh] md:h-[55vh]"
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </div>
          <Card
            media={section.bottom}
            className="h-[55vh] md:h-[75vh]"
            sizes="100vw"
          />
        </section>
      );
  }
};

export default function ProjectPage({ project }: { project: Project }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const arrowCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const hero = heroRef.current;
    const head = headRef.current;
    if (!overlay || !hero || !head) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set(overlay, { yPercent: 100, opacity: 1 });
      gsap.set(hero, { opacity: 0, scale: 1.12 });
      gsap.set(head.querySelectorAll(".reveal"), { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.55,
        ease: "power3.out",
      })
        .to(
          overlay,
          {
            yPercent: 65,
            opacity: 0,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "+=0.05",
        )
        .to(
          hero,
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          head.querySelectorAll(".reveal"),
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=0.55",
        );
    });

    return () => ctx.revert();
  }, [project.slug]);

  useEffect(() => {
    const cursor = arrowCursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      opacity: 0,
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    });
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".arrow-cursor-target"),
    );

    const enter = (el: HTMLElement) => (e: MouseEvent) => {
      el.style.cursor = "none";
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    };
    const leave = (el: HTMLElement) => () => {
      el.style.cursor = "";
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "power3.in",
        overwrite: "auto",
      });
    };

    const handlers = targets.map((el) => {
      const onEnter = enter(el);
      const onLeave = leave(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return { el, onEnter, onLeave };
    });

    return () => {
      window.removeEventListener("mousemove", move);
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.style.cursor = "";
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [project.slug]);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const id = window.setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".project-section")
          .forEach((section) => {
            gsap.from(section, {
              opacity: 0,
              y: 60,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
              },
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".project-text-title")
          .forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".project-text-body")
          .forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 20,
              duration: 0.9,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });

        const otherCards = gsap.utils.toArray<HTMLElement>(".other-project");
        if (otherCards.length) {
          gsap.from(otherCards, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: otherCards[0],
              start: "top 85%",
            },
          });
        }

        ScrollTrigger.refresh();
      });
    }, 400);

    return () => {
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, [project.slug]);

  return (
    <main className="relative w-full bg-[#f4f1ea] text-black overflow-x-hidden">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] bg-[#f4f1ea] pointer-events-none"
        aria-hidden
      />

      <div className="fixed top-0 left-0 w-full z-50 px-5 sm:px-8 md:px-12 py-5 md:py-6 flex items-center justify-between font-manrope text-[0.78rem] tracking-tight backdrop-blur-xl bg-[#f4f1ea]/40 border-b border-black/5">
        <Link
          href="/#all-work"
          className="group inline-flex items-center gap-2 uppercase tracking-tight text-black"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Work
        </Link>
        <Link
          href="/"
          className="uppercase tracking-tight font-medium text-black"
        >
          Serdar Akova
        </Link>
        <a
          href="mailto:serdar.akova5@gmail.com"
          className="arrow-cursor-target hidden md:inline-flex items-center rounded-full bg-black text-white px-5 py-2 uppercase tracking-tight"
        >
          Contact
        </a>
      </div>

      <section
        ref={heroRef}
        className="relative w-full h-[60vh] md:h-[70vh] mt-20 md:mt-24 overflow-hidden bg-[#ece8df]"
        style={{ willChange: "transform" }}
      >
        <MediaEl
          media={project.hero}
          sizes="100vw"
          priority
          fit={project.hero.fit ?? "cover"}
          className={project.hero.fit === "contain" ? "" : "object-top"}
        />
      </section>

      <section
        ref={headRef}
        className="px-4 md:px-12 pt-10 md:pt-14 pb-12 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
      >
        <div className="md:col-span-7 max-w-3xl">
          <h1 className="reveal font-eb-garamond text-4xl md:text-7xl leading-[0.95] tracking-[-0.03em] text-black">
            {project.title}
          </h1>
          <h2 className="reveal font-eb-garamond text-2xl md:text-4xl leading-tight tracking-[-0.02em] text-black/55 mt-4 md:mt-6">
            {project.tagline}
          </h2>
          {project.intro && (
            <p className="reveal font-manrope text-base md:text-lg leading-relaxed text-black/70 tracking-tight mt-8 max-w-2xl">
              {project.intro}
            </p>
          )}
        </div>

        <div className="md:col-span-4 md:col-start-9 grid grid-cols-2 md:grid-cols-1 gap-y-8 gap-x-6 font-manrope text-sm">
          <div className="reveal">
            <p className="uppercase tracking-tight text-black/45 mb-2">Date</p>
            <p className="text-black/85">{project.date}</p>
          </div>
          <div className="reveal">
            <p className="uppercase tracking-tight text-black/45 mb-2">
              Location
            </p>
            <p className="text-black/85">{project.location}</p>
          </div>
          <div className="reveal col-span-2 md:col-span-1">
            <p className="uppercase tracking-tight text-black/45 mb-2">
              Services
            </p>
            <ul className="space-y-1 text-black/85">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          {project.website && (
            <div className="reveal col-span-2 md:col-span-1">
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="arrow-cursor-target inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 backdrop-blur-md px-5 py-3 text-black hover:bg-black hover:text-white transition-colors"
              >
                {project.websiteLabel ?? "Visit Website"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      <div className="space-y-12 md:space-y-20 pb-32">
        {project.sections.map((section, i) => renderSection(section, i))}
      </div>

      <section className="border-t border-black/5 px-4 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <h3 className="font-eb-garamond text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-black">
            More Work
          </h3>
          <Link
            href="/#all-work"
            className="font-manrope uppercase tracking-tight text-xs md:text-sm text-black/70 hover:text-black inline-flex items-center gap-2"
          >
            All Projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="other-project group block relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#ece8df] aspect-[4/5]"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
                  <MediaEl
                    media={p.hero}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-eb-garamond text-xl md:text-2xl tracking-[-0.02em] leading-tight text-white">
                      {p.title}
                    </p>
                    <p className="font-manrope text-xs md:text-sm text-white/70 tracking-tight mt-1.5">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Footer />

      <div
        ref={arrowCursorRef}
        className="fixed top-0 left-0 z-[300] pointer-events-none flex items-center justify-center w-9 h-9 rounded-full bg-black text-white"
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
    </main>
  );
}
