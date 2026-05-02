"use client";

import { useState } from "react";
import { HeroOrbit } from "./hero-orbit";
import { HeroHeatmap } from "./hero-heatmap";
import { HeroAscii } from "./hero-ascii";

const HERO_OPTIONS = [
  { id: "orbit", label: "궤도" },
  { id: "heatmap", label: "히트맵" },
  { id: "ascii", label: "ASCII" },
] as const;

type HeroVariant = (typeof HERO_OPTIONS)[number]["id"];

interface HeroProps {
  postCount: number;
}

export function Hero({ postCount }: HeroProps) {
  const [variant, setVariant] = useState<HeroVariant>("orbit");

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-header">
          <div className="hero-meta">
            <span>
              <span className="live-dot" />
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>Seoul, KR</span>
            <span>KST (UTC+9)</span>
          </div>
          <div className="hero-switcher">
            {HERO_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={variant === opt.id ? "active" : ""}
                onClick={() => setVariant(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="hero-stage"
          style={{
            borderRadius: "20px",
            border: "1px solid var(--line)",
            overflow: "hidden",
            minHeight: "520px",
          }}
        >
          {variant === "orbit" && <HeroOrbit postCount={postCount} />}
          {variant === "heatmap" && <HeroHeatmap postCount={postCount} />}
          {variant === "ascii" && <HeroAscii />}
        </div>
      </div>
    </section>
  );
}
