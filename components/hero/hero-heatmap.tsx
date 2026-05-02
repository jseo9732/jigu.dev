"use client";

import { useState, useMemo } from "react";

function generatePlaceholderContribs(): number[][] {
  return Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => {
      const r = Math.random();
      if (r > 0.7) return Math.floor(Math.random() * 4) + 1;
      return 0;
    })
  );
}

interface HeroHeatmapProps {
  postCount: number;
  contributions?: number[][];
}

export function HeroHeatmap({ postCount, contributions }: HeroHeatmapProps) {
  const contribs = useMemo(
    () => contributions ?? generatePlaceholderContribs(),
    [contributions]
  );
  const [hover, setHover] = useState<{ wi: number; di: number; lv: number } | null>(null);

  const total = contribs.flat().reduce((a, v) => a + (v > 0 ? v : 0), 0);
  const active = contribs.flat().filter((v) => v > 0).length;
  const streak = useMemo(() => {
    const flat = contribs.flat();
    let best = 0, cur = 0;
    for (const v of flat) {
      if (v > 0) { cur++; best = Math.max(best, cur); } else cur = 0;
    }
    return best;
  }, [contribs]);

  return (
    <div className="h-heat">
      <div className="h-heat-top">
        <div>
          <h2 className="h-heat-title">
            매주 쓰고, 매일 <span style={{ color: "var(--accent)" }}>커밋</span>합니다.
          </h2>
          <p className="h-heat-sub">
            글을 쓰는 속도는 코드를 쓰는 리듬을 따라갑니다 — 조금씩, 꾸준히.
          </p>
        </div>
        <div className="h-heat-summary">
          <div className="s">
            <span className="n">{total.toLocaleString()}</span>
            <span className="l">contributions</span>
          </div>
          <div className="s">
            <span className="n">{streak}</span>
            <span className="l">day streak</span>
          </div>
          <div className="s">
            <span className="n">{active}</span>
            <span className="l">active days</span>
          </div>
        </div>
      </div>

      <div className="heat-grid-wrap">
        <div className="heat-grid">
          <div className="heat-days">
            <span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span /><span>Sun</span>
          </div>
          <div className="heat-cols">
            {contribs.map((week, wi) => (
              <div key={wi} className="heat-col">
                {week.map((lv, di) => (
                  <div
                    key={di}
                    className="heat-cell"
                    data-lv={lv > 0 ? lv : undefined}
                    onMouseEnter={() => setHover({ wi, di, lv })}
                    onMouseLeave={() => setHover(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-heat-stats">
        <div className="h-heat-stat">
          <div className="big">
            {hover ? hover.lv : "—"}
            <span className="unit">contributions</span>
          </div>
          <div className="sm">
            {hover
              ? `week ${hover.wi + 1} · ${["sun", "mon", "tue", "wed", "thu", "fri", "sat"][hover.di]}`
              : "hover a cell to inspect a day"}
          </div>
        </div>
        <div className="h-heat-stat">
          <div className="big">{postCount}<span className="unit">posts</span></div>
          <div className="sm">total</div>
        </div>
        <div className="h-heat-stat">
          <div className="big">~ 2.1<span className="unit">commits / day</span></div>
          <div className="sm">avg. including weekends</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div className="heat-legend">
            less
            <div className="lg" />
            <div className="lg" data-lv="1" />
            <div className="lg" data-lv="2" />
            <div className="lg" data-lv="3" />
            <div className="lg" data-lv="4" />
            more
          </div>
        </div>
      </div>
    </div>
  );
}
