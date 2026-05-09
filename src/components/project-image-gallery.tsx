"use client";

import { useState } from "react";
import Image from "next/image";

import type { ProjectGalleryItem } from "@/lib/project-details";

export function ProjectImageGallery({
  items,
  accentClass,
}: {
  items: ProjectGalleryItem[];
  accentClass: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="space-y-5">
      <figure className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/75 shadow-[0_28px_90px_rgba(2,6,23,0.45)]">
        <div
          className={`relative flex min-h-[20rem] items-center justify-center overflow-hidden bg-gradient-to-br ${accentClass} px-6 py-8 sm:min-h-[26rem]`}
        >
          {activeItem.src ? (
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          ) : (
            <div className="relative z-10 mx-auto w-full max-w-3xl rounded-[26px] border border-dashed border-white/20 bg-slate-950/70 p-8 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200/70">
                Placeholder Visual
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                {activeItem.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                {activeItem.caption}
              </p>
            </div>
          )}
        </div>
        <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-slate-300">
          {activeItem.caption}
        </figcaption>
      </figure>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const selected = index === activeIndex;

          return (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`text-left transition ${
                selected ? "translate-y-[-2px]" : "hover:translate-y-[-2px]"
              }`}
            >
              <div
                className={`h-full rounded-[22px] border px-4 py-4 shadow-[0_18px_45px_rgba(2,6,23,0.28)] ${
                  selected
                    ? "border-cyan-300/45 bg-slate-900/90"
                    : "border-white/10 bg-slate-900/65 hover:border-cyan-300/25"
                }`}
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.caption}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
