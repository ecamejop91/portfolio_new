"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Image from "next/image";

type FloatingShapeState = {
  cycle: number;
  durationMs: number;
  leftPx: number;
  topPx: number;
  sizePx: number;
  travelPx: number;
  src: string;
};

export function AmbientBackground({
  variant = "project",
}: {
  variant?: "project" | "project-index";
}) {
  const [backgroundShapePngs, setBackgroundShapePngs] = useState<string[]>([]);
  const [shapeStates, setShapeStates] = useState<FloatingShapeState[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadShapePngs = async () => {
      try {
        const response = await fetch("/api/background-shapes", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { files?: string[] };
        if (!mounted) {
          return;
        }

        setBackgroundShapePngs(Array.isArray(data.files) ? data.files : []);
      } catch {
        if (mounted) {
          setBackgroundShapePngs([]);
        }
      }
    };

    void loadShapePngs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (backgroundShapePngs.length === 0) {
      setShapeStates([]);
      return;
    }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const randomInt = (min: number, max: number) =>
      Math.floor(randomInRange(min, max + 1));
    const gapPx = 14;

    const overlaps = (
      a: { leftPx: number; topPx: number; sizePx: number; travelPx: number },
      b: { leftPx: number; topPx: number; sizePx: number; travelPx: number },
    ) => {
      const aLeft = a.leftPx - gapPx;
      const aRight = a.leftPx + a.sizePx + gapPx;
      const aTop = a.topPx - gapPx;
      const aBottom = a.topPx + a.sizePx + a.travelPx + gapPx;

      const bLeft = b.leftPx - gapPx;
      const bRight = b.leftPx + b.sizePx + gapPx;
      const bTop = b.topPx - gapPx;
      const bBottom = b.topPx + b.sizePx + b.travelPx + gapPx;

      return aLeft < bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop;
    };

    const pickPlacement = (
      sizePx: number,
      travelPx: number,
      existing: FloatingShapeState[],
      skipIndex: number | null,
    ) => {
      const viewportWidth = Math.max(320, window.innerWidth);
      const viewportHeight = Math.max(320, window.innerHeight);
      const maxLeft = Math.max(0, viewportWidth - sizePx);
      const maxTop = Math.max(0, viewportHeight - sizePx - travelPx);
      const candidates = existing.filter((_, idx) => idx !== skipIndex);

      for (let attempt = 0; attempt < 120; attempt += 1) {
        const leftPx = randomInRange(0, maxLeft);
        const topPx = randomInRange(0, maxTop);
        const candidate = { leftPx, topPx, sizePx, travelPx };
        const hasOverlap = candidates.some((other) => overlaps(candidate, other));
        if (!hasOverlap) {
          return { leftPx, topPx };
        }
      }

      return { leftPx: randomInRange(0, maxLeft), topPx: randomInRange(0, maxTop) };
    };

    const makeShapeState = (
      src: string,
      existing: FloatingShapeState[],
      skipIndex: number | null,
      cycle = 0,
    ): FloatingShapeState => {
      const durationMs = randomInt(10_000, 20_000);
      const sizePx = randomInt(80, 200);
      const travelPx = randomInt(40, 200);
      const { leftPx, topPx } = pickPlacement(sizePx, travelPx, existing, skipIndex);
      return {
        src,
        cycle,
        durationMs,
        leftPx,
        topPx,
        sizePx,
        travelPx,
      };
    };

    const initialStates: FloatingShapeState[] = [];
    backgroundShapePngs.forEach((src) => {
      initialStates.push(makeShapeState(src, initialStates, null));
    });
    setShapeStates(initialStates);
  }, [backgroundShapePngs]);

  const handleShapeCycleEnd = (index: number, cycle: number) => {
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const randomInt = (min: number, max: number) =>
      Math.floor(randomInRange(min, max + 1));
    const gapPx = 14;

    const overlaps = (
      a: { leftPx: number; topPx: number; sizePx: number; travelPx: number },
      b: { leftPx: number; topPx: number; sizePx: number; travelPx: number },
    ) => {
      const aLeft = a.leftPx - gapPx;
      const aRight = a.leftPx + a.sizePx + gapPx;
      const aTop = a.topPx - gapPx;
      const aBottom = a.topPx + a.sizePx + a.travelPx + gapPx;

      const bLeft = b.leftPx - gapPx;
      const bRight = b.leftPx + b.sizePx + gapPx;
      const bTop = b.topPx - gapPx;
      const bBottom = b.topPx + b.sizePx + b.travelPx + gapPx;

      return aLeft < bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop;
    };

    setShapeStates((prev) => {
      const current = prev[index];
      if (!current || current.cycle !== cycle) {
        return prev;
      }

      const viewportWidth = Math.max(320, window.innerWidth);
      const viewportHeight = Math.max(320, window.innerHeight);
      const sizePx = randomInt(80, 200);
      const travelPx = randomInt(40, 200);
      const maxLeft = Math.max(0, viewportWidth - sizePx);
      const maxTop = Math.max(0, viewportHeight - sizePx - travelPx);
      const candidates = prev.filter((_, idx) => idx !== index);

      let leftPx = randomInRange(0, maxLeft);
      let topPx = randomInRange(0, maxTop);

      for (let attempt = 0; attempt < 120; attempt += 1) {
        const candidate = { leftPx, topPx, sizePx, travelPx };
        const hasOverlap = candidates.some((other) => overlaps(candidate, other));
        if (!hasOverlap) {
          break;
        }
        leftPx = randomInRange(0, maxLeft);
        topPx = randomInRange(0, maxTop);
      }

      const updated: FloatingShapeState = {
        src: current.src,
        cycle: current.cycle + 1,
        durationMs: randomInt(10_000, 20_000),
        leftPx,
        topPx,
        sizePx,
        travelPx,
      };

      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const topGlowClass =
    variant === "project-index" ? "bg-cyan-200/28" : "bg-cyan-200/22";
  const sideGlowClass =
    variant === "project-index" ? "bg-sky-300/20" : "bg-sky-300/16";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="system-grid absolute inset-0 opacity-30" />
      <div className="system-shape-field absolute inset-0 opacity-90">
        {shapeStates.map((shape, index) => (
          <Image
            key={`${shape.src}-${index}-cycle-${shape.cycle}`}
            src={shape.src}
            alt=""
            width={shape.sizePx}
            height={shape.sizePx}
            className="system-shape"
            onAnimationEnd={() => handleShapeCycleEnd(index, shape.cycle)}
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            style={
              {
                left: `${shape.leftPx}px`,
                top: `${shape.topPx}px`,
                width: `${shape.sizePx}px`,
                height: `${shape.sizePx}px`,
                "--shape-cycle-duration": `${shape.durationMs}ms`,
                "--shape-travel": `${shape.travelPx}px`,
              } as CSSProperties
            }
            aria-hidden
            unoptimized
          />
        ))}
      </div>
      <div
        className={`system-light-slow absolute left-1/2 top-[-8rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl ${topGlowClass}`}
      />
      <div
        className={`system-light-fast absolute bottom-[6%] right-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl ${sideGlowClass}`}
      />
      <div className="absolute left-[8%] top-[18%] hidden h-px w-72 bg-gradient-to-r from-transparent via-cyan-200/12 to-transparent md:block" />
      <div className="absolute bottom-[20%] right-[16%] hidden h-px w-56 bg-gradient-to-r from-transparent via-slate-100/35 to-transparent md:block" />
    </div>
  );
}
