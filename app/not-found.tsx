"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const [t, setT] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const loop = (now: number) => {
      setT((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stars = useMemo(() => {
    const s: { left: number; top: number; size: number; delay: number; duration: number }[] = [];
    let seed = 1;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 60; i++) {
      s.push({
        left: rnd() * 100,
        top: rnd() * 100,
        size: 1 + rnd() * 2,
        delay: rnd() * 3,
        duration: 2 + rnd() * 3,
      });
    }
    return s;
  }, []);

  const satX = 50 + 32 * Math.cos(t * 0.6);
  const satY = 50 + 32 * Math.sin(t * 0.6);
  const sat2X = 50 + 22 * Math.cos(-t * 0.9 + 1.2);
  const sat2Y = 50 + 22 * Math.sin(-t * 0.9 + 1.2);

  const requestedPath = pathname || "/unknown";

  return (
    <div className="nf">
      {/* starfield */}
      <div className="nf-stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="nf-star"
            style={{
              left: s.left + "%",
              top: s.top + "%",
              width: s.size + "px",
              height: s.size + "px",
              animationDelay: s.delay + "s",
              animationDuration: s.duration + "s",
            }}
          />
        ))}
        <span className="nf-shooting" style={{ top: "20%", right: "10%", animationDelay: "0s" }} />
        <span className="nf-shooting" style={{ top: "60%", right: "30%", animationDelay: "3s" }} />
      </div>

      {/* main content */}
      <div className="nf-main">
        <div className="nf-content">
          <div className="nf-tag">
            <span className="blip" />
            signal lost
          </div>
          <h1 className="nf-code">
            4<span className="glitch">0</span>4
          </h1>
          <h2 className="nf-title">지구를 한참 벗어났습니다.</h2>
          <p className="nf-lead">
            요청하신 좌표에는 아무것도 없었어요. 잘못된 링크이거나, 글이 옮겨졌거나, 아직 우주 어딘가에서 표류 중일 수 있습니다.
          </p>

          <div className="nf-coords">
            <div className="nf-coords-row">
              <span className="k">$ ping</span>
              <span className="v err">{requestedPath}</span>
            </div>
            <div className="nf-coords-row">
              <span className="k">status</span>
              <span className="v err">404 · NOT_FOUND</span>
            </div>
            <div className="nf-coords-row">
              <span className="k">latency</span>
              <span className="v">∞ ms</span>
            </div>
            <div className="nf-coords-row">
              <span className="k">retry</span>
              <span className="v">
                false<span className="cursor" />
              </span>
            </div>
          </div>

          <div className="nf-actions">
            <Link href="/" className="cta-primary">
              <span>←</span> 지구로 돌아가기
            </Link>
            <Link href="/posts" className="cta-secondary">
              글 목록 보기
            </Link>
          </div>
        </div>

        {/* right stage */}
        <div className="nf-stage">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="nfPlanetGrad" cx="35%" cy="35%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="55%" stopColor="#00884a" />
                <stop offset="100%" stopColor="#001a10" />
              </radialGradient>
              <pattern id="nfGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--line)" strokeWidth="0.15" />
              </pattern>
            </defs>

            <rect x="0" y="0" width="100" height="100" fill="url(#nfGrid)" opacity="0.6" />

            <circle className="nf-orbit-dashed nf-pulse" cx="50" cy="50" r="46" />
            <circle className="nf-orbit-dashed" cx="50" cy="50" r="38" />
            <circle className="nf-orbit-dashed" cx="50" cy="50" r="30" />

            <circle className="nf-trail" cx="50" cy="50" r="32" />
            <circle className="nf-trail" cx="50" cy="50" r="22" />

            <circle className="nf-planet-body" cx="50" cy="50" r="14" />
            <ellipse
              className="nf-planet-ring"
              cx="50"
              cy="50"
              rx="22"
              ry="6"
              transform={`rotate(${-15 + Math.sin(t * 0.3) * 4} 50 50)`}
            />

            <text
              x="50"
              y="51.5"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize="3.5"
              fill="#0a0a0a"
              fontWeight="700"
            >
              지구
            </text>

            <g>
              <circle className="nf-satellite" cx={satX} cy={satY} r="1.4" />
              <line className="nf-label-line" x1={satX} y1={satY} x2={satX + 6} y2={satY - 5} />
              <text className="nf-label" x={satX + 6.5} y={satY - 5}>
                sat-01
              </text>
            </g>
            <g>
              <circle className="nf-satellite" cx={sat2X} cy={sat2Y} r="1.0" />
            </g>

            <g transform="translate(78, 16)">
              <circle r="2.2" fill="none" stroke="var(--accent)" strokeWidth="0.4" className="nf-pulse" />
              <circle r="0.8" fill="var(--accent)" />
              <line className="nf-label-line" x1="-2" y1="0" x2="-6" y2="-4" />
              <text className="nf-label ac" x="-6.5" y="-4" textAnchor="end">
                YOU
              </text>
              <text className="nf-label" x="-6.5" y="-0.5" textAnchor="end">
                ARE HERE
              </text>
            </g>

            <g stroke="var(--fg-dimmer)" strokeWidth="0.3" fill="none">
              <path d="M 4 4 L 4 8 M 4 4 L 8 4" />
              <path d="M 96 4 L 96 8 M 96 4 L 92 4" />
              <path d="M 4 96 L 4 92 M 4 96 L 8 96" />
              <path d="M 96 96 L 96 92 M 96 96 L 92 96" />
            </g>

            <text className="nf-label" x="6" y="98" fill="var(--fg-dimmer)">
              x: 0,0,0
            </text>
            <text className="nf-label" x="74" y="98" fill="var(--fg-dimmer)">
              range: ∞
            </text>
          </svg>
        </div>
      </div>

      {/* footer breadcrumb */}
      <div className="nf-foot">
        <div className="crumbs">
          <Link href="/">home</Link>
          <span>›</span>
          <span style={{ color: "var(--accent)" }}>void</span>
          <span>›</span>
          <span>{requestedPath}</span>
        </div>
        <div className="signal">
          <span>signal</span>
          <span>
            <span className="bar" style={{ height: 6 }} />
            <span className="bar" style={{ height: 9 }} />
            <span className="bar" style={{ height: 12 }} />
            <span className="bar" style={{ height: 15 }} />
          </span>
          <span style={{ color: "var(--fg-dimmer)" }}>0% · disconnected</span>
        </div>
      </div>
    </div>
  );
}
