import type { Metadata } from "next";
import { AboutClient } from "@/components/about/about-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "소개",
  description: `${siteConfig.name}에 대해 — 4년차 프론트엔드 엔지니어, 잘 읽히는 코드를 좋아합니다.`,
};

export default function AboutPage() {
  return <AboutClient />;
}
