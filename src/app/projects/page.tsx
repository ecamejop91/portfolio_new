import type { Metadata } from "next";
import Link from "next/link";

import { AmbientBackground } from "@/components/ambient-background";
import { projectDetails } from "@/lib/project-details";

export const metadata: Metadata = {
  title: "Projects | Elie Portfolio",
  description:
    "Technical project detail pages covering AI product work, Linux automation, portfolio infrastructure, and local document search.",
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_25%),linear-gradient(180deg,#020617_0%,#020617_34%,#020b16_100%)] text-white">
      <AmbientBackground variant="project-index" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="sticky top-4 z-30 mb-6 flex justify-start">
          <Link
            href="/#work"
            className="inline-flex items-center rounded-full border border-white/12 bg-slate-950/80 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_18px_50px_rgba(2,6,23,0.35)] backdrop-blur-xl transition hover:border-cyan-300/35 hover:text-white"
          >
            Back to Projects
          </Link>
        </div>

        <section className="overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/72 shadow-[0_35px_120px_rgba(2,6,23,0.45)]">
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400/30 via-blue-400/15 to-transparent" />
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
              Project Library
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Dedicated technical case studies for the projects behind this portfolio.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Each project page is built for fast recruiter scanning and deeper engineering review.
              The details stay specific about what was built, what was configured, and what I
              personally owned.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          {projectDetails.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/72 p-6 shadow-[0_28px_90px_rgba(2,6,23,0.38)] transition hover:-translate-y-1 hover:border-cyan-300/25"
            >
              <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${project.accent}`} />
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                {project.type}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.subtitle}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetaChip label="Role" value={project.role} />
                <MetaChip label="Status" value={project.status} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-2">
                {project.impact.slice(0, 3).map((item) => (
                  <li key={item} className="text-sm leading-7 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex text-sm font-medium text-cyan-200 transition group-hover:text-white">
                Open full project page
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}
