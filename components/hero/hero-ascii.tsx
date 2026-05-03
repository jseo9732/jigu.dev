"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { getCareerDecimal } from "@/lib/career";

const ASCII_ART = ` ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
          ▄▄▄▄
       ▄██████████▄         ██  ██    ▄████▄   ██  ██     ▄████▄   ▄█████▄   ▄█████▄
     ▄██▀▀     ▀▀██▄        ██  ██   ██    ██  ██  ██    ██    ██  ██   ██   ██   ██
    ██▀  ▄▀▀▄    ▀██        ██  ██   ██        ██  ██    ██        ██   ██   ██   ██
   ██   █  ╱╲█    ██        ██  ██   ██  ▄▄▄   ██  ██    ██  ▄▄▄   █████▀    █████▀
   ██  █  ╱──█    ██         ▀██▀    ██    ██  ██  ██    ██    ██  ██        ██
    ██  ▀  ╲__▀ ▄██
     ██▄        ██▀        ──────────────────────────────────────────────────────
       ▀██▄▄▄▄██▀                       jigu.dev · frontend engineer
          ▀▀▀▀
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄`;

export function HeroAscii() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const glow = 0.85 + 0.15 * Math.sin(tick / 6);

  return (
    <div className="h-ascii">
      <div className="h-ascii-art" style={{ opacity: glow }}>
        {ASCII_ART}
      </div>
      <div className="h-ascii-body">
        <div className="h-ascii-text">
          <h2>
            안녕하세요,<br />
            <span className="g">지구</span> 입니다.
          </h2>
          <p>
            {siteConfig.bio} 여기는 배운 것과 실수한 것, 그리고 다시 배운 것이 천천히 쌓이는 공간입니다.
          </p>
        </div>
        <div className="h-ascii-info">
          <div className="row">
            <span className="k">$ role</span>
            <span className="v">frontend engineer</span>
          </div>
          <div className="row">
            <span className="k">$ years</span>
            <span className="v">{getCareerDecimal()}y</span>
          </div>
          <div className="row">
            <span className="k">$ stack</span>
            <span className="v">
              <span className="ac">TypeScript</span> · React · Next.js
            </span>
          </div>
          <div className="row">
            <span className="k">$ loc</span>
            <span className="v">{siteConfig.location}</span>
          </div>
          <div className="row">
            <span className="k">$ status</span>
            <span className="v">
              <span className="ac">●</span> open to chat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
