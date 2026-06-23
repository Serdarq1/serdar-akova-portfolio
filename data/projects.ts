export type Media = {
  type: "image" | "video";
  src: string;
  alt?: string;
  fit?: "cover" | "contain";
};

export type Section =
  | { kind: "fullscreen"; media: Media }
  | {
      kind: "leftBigRightStack";
      left: Media;
      right: [Media, Media];
    }
  | {
      kind: "fourGrid";
      items: [Media, Media, Media, Media];
    }
  | {
      kind: "textImage";
      title: string;
      body: string;
      media: Media;
      reversed?: boolean;
    }
  | {
      kind: "twoTopOneBottom";
      top: [Media, Media];
      bottom: Media;
    };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  hero: Media;
  date: string;
  location: string;
  services: string[];
  website?: string;
  websiteLabel?: string;
  intro?: string;
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: "shining-brows-website",
    title: "Shining Brows Website",
    tagline: "A 3D-driven website for a beauty academy.",
    hero: { type: "image", src: "/sb_hero.png", alt: "Shining Brows hero" },
    date: "2024 — Present",
    location: "Türkiye",
    services: ["Brand Design", "UI Design", "Three.js", "Development"],
    website: "https://shiningbrowsacademy.com",
    intro:
      "A 3D-driven editorial site that pulls a beauty academy out of the generic template trap and into a premium, crafted feel — built with Next.js, Three.js, GSAP, and Lenis.",
    sections: [
      {
        kind: "fullscreen",
        media: { type: "video", src: "/sb_gallery_animation.mov" },
      },
      {
        kind: "leftBigRightStack",
        left: {
          type: "image",
          src: "/sb_product_gallery_mobile.png",
          alt: "Mobile product gallery",
        },
        right: [
          { type: "image", src: "/sb_workshops.png", alt: "Workshops" },
          { type: "video", src: "/sb_hero.mov", alt: "Ranks" },
        ],
      },
      {
        kind: "textImage",
        title: "A 3D Gallery That Sells",
        body: "Built with Three.js and tuned to feel weightless, the product gallery turns a static catalogue into a tactile showroom. Scroll-linked motion, careful materials, and meticulous easing make every interaction feel native and considered.",
        media: {
          type: "video",
          src: "/sb_product_gallery_animation.mov",
        },
      },
      {
        kind: "twoTopOneBottom",
        top: [
          { type: "image", src: "/sb_expert_map.png", alt: "Expert map" },
          {
            type: "video",
            src: "/sb_hybrid_remover_animation.mov",
            alt: "Hybrid Remover",
          },
        ],
        bottom: { type: "image", src: "/sb_workshops.png", alt: "Workshops" },
      },
      {
        kind: "textImage",
        title: "Editorial, Not Template",
        body: "Typography, grid, and white space are treated like ingredients in a print magazine — bespoke rather than borrowed. Every breakpoint was tuned by hand to keep the rhythm intact from 320px to ultrawide.",
        media: { type: "video", src: "/sb_hero.mov", alt: "Hero" },
        reversed: true,
      },
    ],
  },
  {
    slug: "shining-brows-app",
    title: "Shining Brows App",
    tagline: "A mobile-first PWA for the academy ecosystem.",
    hero: {
      type: "image",
      src: "/shiningbrows_app_mainscreen.png",
      alt: "Shining Brows app main screen",
      fit: "contain",
    },
    date: "2024 — Present",
    location: "Türkiye",
    services: ["Mobile-first PWA", "Flask", "JavaScript", "HTML/CSS"],
    website: "https://apps.apple.com/tr/app/shining-brows-expert-portal/id6758101995",
    websiteLabel: "Visit App",
    intro:
      "A mobile-first PWA built on Flask + vanilla JS that gives experts, students, and academy admins one shared surface — fast, offline-tolerant, and installable.",
    sections: [
      {
        kind: "fullscreen",
        media: {
          type: "image",
          src: "/shiningbrows_app_mainscreen.png",
          alt: "Main screen",
          fit: "contain",
        },
      },
      {
        kind: "fourGrid",
        items: [
          {
            type: "image",
            src: "/sb_app_expert_feed.png",
            alt: "Expert feed",
            fit: "contain",
          },
          {
            type: "image",
            src: "/sb_app_products.png",
            alt: "Products",
            fit: "contain",
          },
          {
            type: "image",
            src: "/sb_app_media.png",
            alt: "Media",
            fit: "contain",
          },
          {
            type: "image",
            src: "/sb_app_world.png",
            alt: "World",
            fit: "contain",
          },
        ],
      },
      {
        kind: "textImage",
        title: "One App, Three Roles",
        body: "Experts, students, and admins each get a different home — but the underlying surface is one PWA. Role-aware navigation, shared design tokens, and a tiny Flask backend keep everything moving at native speed.",
        media: {
          type: "image",
          src: "/sb_expert_app_home.png",
          alt: "Expert home",
          fit: "contain",
        },
      },
    ],
  },
  {
    slug: "velora",
    title: "Velora",
    tagline: "A SaaS platform for salons.",
    hero: { type: "image", src: "/velora_home.png", alt: "Velora dashboard" },
    date: "2026 — Present",
    location: "Türkiye",
    services: [
      "Product Design",
      "Next.js",
      "FastAPI",
      "Supabase",
      "Payments",
    ],
    website: "https://dashboard.veloraappy.com",
    intro:
      "An end-to-end SaaS for salons. Calendars, clients, products, payments, and analytics. Built on Next.js + FastAPI, with Clerk for auth, Supabase for data, and Iyzico for payments.",
    sections: [
      {
        kind: "fullscreen",
        media: { type: "image", src: "/velora_calendar.png", alt: "Calendar" },
      },
      {
        kind: "leftBigRightStack",
        left: {
          type: "image",
          src: "/velora_calendar_mobile.png",
          alt: "Calendar",
        },
        right: [
          {
            type: "image",
            src: "/velora_client_details.png",
            alt: "Client details",
          },
          {
            type: "video",
            src: "/velora_create_income.mov",
            alt: "Sales & payments",
          },
        ],
      },
      {
        kind: "textImage",
        title: "Designed Like a Product, Not a Dashboard",
        body: "Most SaaS dashboards look like spreadsheets. Velora reads like a product — typography, spacing, and motion all tuned for a calm, premium feel even when you're staring at it for eight hours a day.",
        media: { type: "image", src: "/velora_products.png", alt: "Products" },
      },
      {
        kind: "twoTopOneBottom",
        top: [
          {
            type: "image",
            src: "/velora_revenue.png",
            alt: "Revenue",
          },
          {
            type: "image",
            src: "/velora_landing_page_section2.png",
            alt: "Landing section 2",
          },
        ],
        bottom: {
          type: "video",
          src: "/velora_create_appointment.mov",
          alt: "Create appointment",
        },
      },
      {
        kind: "textImage",
        title: "Payments in the Local Stack",
        body: "Iyzico for Turkish card processing, Clerk for auth, Supabase for data and storage — chosen for the regional realities of the customer base, not because they're trendy.",
        media: { type: "image", src: "/velora_products.png", alt: "Products" },
        reversed: true,
      },
    ],
  },
  {
    slug: "eymen-karadeniz-portfolio",
    title: "Eymen Karadeniz Portfolio",
    tagline: "A professional editorial portfolio.",
    hero: { type: "image", src: "/eymen_hero.png", alt: "Eymen hero" },
    date: "2026",
    location: "Türkiye",
    services: ["Web Design", "Three.js", "GSAP", "Framer Motion"],
    website: "https://eymen-portfolio.vercel.app/",
    intro:
      "An editorial portfolio with a hand-animated 3D hero, smooth Lenis-driven scroll, and a typographic system.",
    sections: [
      {
        kind: "fullscreen",
        media: {
          type: "video",
          src: "/eymen_3d_hand_animation.mov",
        },
      },
      {
        kind: "twoTopOneBottom",
        top: [
          { type: "image", src: "/eymen_hero.png", alt: "Hero" },
          { type: "image", src: "/eymen_section.png", alt: "Section" },
        ],
        bottom: { type: "image", src: "/eymen_footer.png", alt: "Footer" },
      },
      {
        kind: "textImage",
        title: "3D as a Headline, Not a Gimmick",
        body: "The 3D hand isn't decoration — it's the headline. Built with Three.js and choreographed in GSAP, it carries the same weight a serif drop cap would in print.",
        media: {
          type: "video",
          src: "/eymen_3d_hand_animation.mov",
          alt: "Section",
        },
      },
    ],
  },
  {
    slug: "social-media-growth",
    title: "Social Media Growth",
    tagline: "Organic growth at a scale most agencies promise but rarely ship.",
    hero: {
      type: "image",
      src: "/ig_followers.png",
      alt: "Instagram growth",
      fit: "contain",
    },
    date: "2024 — 2026",
    location: "Remote, US",
    services: ["Content Strategy", "Editorial Direction", "Growth"],
    intro:
      "Built a TikTok account from 0 → 51K followers and 11M reach in 3 months. Grew an Instagram page from 118K → 152K followers and 700K → 11M reach in the same window. Fully organic, no paid promotion.",
    sections: [
      {
        kind: "leftBigRightStack",
        left: {
          type: "image",
          src: "/ig_followers.png",
          alt: "Instagram followers",
          fit: "contain",
        },
        right: [
          {
            type: "image",
            src: "/ig_views.png",
            alt: "Instagram views",
            fit: "contain",
          },
          {
            type: "image",
            src: "/tiktok_most_watched.png",
            alt: "TikTok most watched",
            fit: "contain",
          },
        ],
      },
      {
        kind: "textImage",
        title: "Compounding Content, Not Algorithm Hacks",
        body: "Growth came from a single bet: ship one premium, on-brand post every day, and read the data weekly. No giveaways, no paid loops, no shady engagement pods — just rhythm and a strong visual system.",
        media: {
          type: "image",
          src: "/tiktok_followers.png",
          alt: "TikTok followers",
          fit: "contain",
        },
      },
    ],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
