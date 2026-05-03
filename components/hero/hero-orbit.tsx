"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, stackConfig } from "@/lib/site-config";
import { getCareerYears } from "@/lib/career";

const ORBIT_RADII: Record<number, number> = { 1: 14, 2: 22, 3: 30, 4: 38 };
const SPEEDS: Record<number, number> = { 1: 1.0, 2: 0.6, 3: 0.4, 4: 0.25 };
const CX = 50, CY = 50;

interface HeroOrbitProps {
  postCount: number;
}

export function HeroOrbit({ postCount }: HeroOrbitProps) {
  const [angleOffset, setAngleOffset] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const loop = (t: number) => {
      setAngleOffset(((t - t0) / 1000) * 6);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = stackConfig.map((s, i) => {
    const r = ORBIT_RADII[s.orbit];
    const a = ((s.angle + angleOffset * SPEEDS[s.orbit]) * Math.PI) / 180;
    return { ...s, i, x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  });

  const active = hovered != null ? items[hovered] : null;

  return (
    <div className="h-orbit">
      <div className="h-orbit-left">
        <span className="kicker">지구 / jigu — frontend engineer</span>
        <h1>
          작은 <span className="accent">커밋</span>으로<br />
          지구를 움직입니다
        </h1>
        <p className="lead">
          {siteConfig.bio} 이 블로그에는 배운 것, 실수한 것, 다시 배운 것이 시간 순서대로 쌓입니다.
        </p>
        <div className="cta-row">
          <Link className="cta-primary" href="/posts">
            글 읽으러 가기 <span>↓</span>
          </Link>
          <a
            className="cta-secondary"
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="h-orbit-stats">
          <div className="stat">
            <span className="num">{getCareerYears()}년차</span>
            <span className="label">경력</span>
          </div>
          <div className="stat">
            <span className="num">{postCount}+</span>
            <span className="label">글</span>
          </div>
          <div className="stat">
            <span className="num">{stackConfig.length}</span>
            <span className="label">기술</span>
          </div>
        </div>
      </div>

      <div className="h-orbit-right">
        <svg
          className="orbit-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="planetGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="60%" stopColor="#00884a" />
              <stop offset="100%" stopColor="#002818" />
            </radialGradient>
          </defs>

          {[1, 2, 3, 4].map((o) => (
            <circle
              key={o}
              className="orbit-ring"
              cx={CX}
              cy={CY}
              r={ORBIT_RADII[o]}
            />
          ))}

          <circle className="orbit-planet" cx={CX} cy={CY} r="8" />
          <text
            x={CX}
            y={CY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="3.2"
            fontFamily="var(--font-mono)"
            fill="#0a0a0a"
            fontWeight="700"
          >
            지구
          </text>

          {items.map((it, i) => (
            <g
              key={it.name}
              className={`orbit-tech${hovered === i ? " hl" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={it.x}
                cy={it.y}
                r={hovered === i ? 2.4 : 1.8}
                fill={hovered === i ? "var(--accent)" : "var(--fg-dim)"}
              />
              <text x={it.x} y={it.y - 3.2} textAnchor="middle" fontSize="2.4">
                {it.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="orbit-detail">
          {active ? (
            <>
              ▸ <strong>{active.name}</strong> · proficiency {active.level}%
            </>
          ) : (
            <>hover a node to inspect</>
          )}
        </div>
      </div>
    </div>
  );
}
