export const siteConfig = {
  name: "지구",
  handle: "jigu",
  url: "https://jigu.dev",
  description: "작은 커밋으로 지구를 조금씩 움직이는 프론트엔드 개발자",
  tagline: "작은 커밋으로 / 지구를 움직입니다",
  location: "Seoul, KR",
  timezone: "KST (UTC+9)",
  email: "jisu@jigu.dev",
  github: "jisu",
  years: 4,
  bio: "React/Next.js로 웹을 짓고, TypeScript로 무너지지 않게 받칩니다. 잘 읽히는 코드와 잘 읽히는 글을 좋아해요.",
  nav: [
    { label: "글", href: "/posts" },
    { label: "소개", href: "/about" },
  ],
} as const;

export const stackConfig = [
  { name: "TypeScript", level: 92, group: "lang",   orbit: 1, angle: 15 },
  { name: "JavaScript", level: 95, group: "lang",   orbit: 1, angle: 140 },
  { name: "React",      level: 94, group: "ui",     orbit: 2, angle: 40 },
  { name: "Next.js",    level: 88, group: "ui",     orbit: 2, angle: 200 },
  { name: "Tailwind",   level: 82, group: "ui",     orbit: 2, angle: 300 },
  { name: "Node.js",    level: 78, group: "server", orbit: 3, angle: 60 },
  { name: "tRPC",       level: 70, group: "server", orbit: 3, angle: 170 },
  { name: "Postgres",   level: 65, group: "data",   orbit: 3, angle: 280 },
  { name: "Vite",       level: 85, group: "tool",   orbit: 4, angle: 20 },
  { name: "Vitest",     level: 75, group: "tool",   orbit: 4, angle: 110 },
  { name: "Figma",      level: 72, group: "tool",   orbit: 4, angle: 220 },
  { name: "Git",        level: 90, group: "tool",   orbit: 4, angle: 320 },
] as const;

export type StackItem = typeof stackConfig[number];
