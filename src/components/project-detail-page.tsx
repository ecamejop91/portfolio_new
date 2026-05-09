import Link from "next/link";

import type { ProjectDetail } from "@/lib/project-details";
import { ProjectImageGallery } from "@/components/project-image-gallery";

const sectionOrder = [
  ["Overview", "overview"],
  ["Quick Impact", "impact"],
  ["Screenshots & System Views", "gallery"],
  ["Problem", "problem"],
  ["Solution", "solution"],
  ["System Architecture", "architecture"],
  ["Tools & Stack", "tools"],
  ["What I Did", "whatIDid"],
  ["Challenges", "challenges"],
  ["Results", "results"],
  ["Lessons Learned", "lessons"],
  ["Links / Actions", "links"],
] as const;

export function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_38%,#020b16_100%)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="sticky top-4 z-30 mb-6 flex justify-start">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-white/12 bg-slate-950/80 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_18px_50px_rgba(2,6,23,0.35)] backdrop-blur-xl transition hover:border-cyan-300/35 hover:text-white"
          >
            Back to Projects
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/72 shadow-[0_35px_120px_rgba(2,6,23,0.45)]">
            <div className={`h-2 w-full bg-gradient-to-r ${project.accent}`} />
            <div className="px-6 py-7 sm:px-8 sm:py-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
                {project.type}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                {project.subtitle}
              </p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
                {project.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/12 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-100/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkAction href="/projects">Back to Projects</LinkAction>
                {project.links.demo ? (
                  <LinkAction href={project.links.demo}>View Live Demo</LinkAction>
                ) : null}
                {project.links.github ? (
                  <LinkAction href={project.links.github}>View GitHub</LinkAction>
                ) : null}
                {project.links.caseStudy ? (
                  <LinkAction href={project.links.caseStudy}>View Case Study</LinkAction>
                ) : null}
                {project.links.codeRequest ? (
                  <StaticAction>Code available on request.</StaticAction>
                ) : null}
                {project.links.demoRequest ? (
                  <StaticAction>Demo available on request.</StaticAction>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="rounded-[30px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.4)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
              Metadata
            </p>
            <dl className="mt-5 space-y-4">
              <MetadataRow label="Type" value={project.type} />
              <MetadataRow label="Role" value={project.role} />
              <MetadataRow label="Timeline" value={project.timeline} />
              <MetadataRow
                label="Status"
                value={project.status}
                tone={project.statusTone}
              />
            </dl>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Section Map
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectionOrder.map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-10 space-y-8">
          <SectionCard id="overview" title="Overview">
            <ParagraphList items={project.sections.overview} />
          </SectionCard>

          <SectionCard id="impact" title="Quick Impact">
            <BulletList items={project.impact} />
          </SectionCard>

          <SectionCard id="gallery" title="Screenshots & System Views">
            <ProjectImageGallery items={project.gallery} accentClass={project.accent} />
          </SectionCard>

          <div className="grid gap-8 lg:grid-cols-2">
            <SectionCard id="problem" title="Problem">
              <ParagraphList items={project.sections.problem} />
            </SectionCard>
            <SectionCard id="solution" title="Solution">
              <ParagraphList items={project.sections.solution} />
            </SectionCard>
          </div>

          <SectionCard id="architecture" title="System Architecture">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.architecture.map((step, index) => (
                <div
                  key={step.label}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.22)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/75">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{step.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="tools" title="Tools & Stack">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {project.tools.map((group) => (
                <div
                  key={group.label}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/75">
                    {group.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="grid gap-8 lg:grid-cols-2">
            <SectionCard id="whatIDid" title="What I Did">
              <BulletList items={project.sections.whatIDid} />
            </SectionCard>
            <SectionCard id="challenges" title="Challenges">
              <BulletList items={project.sections.challenges} />
            </SectionCard>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <SectionCard id="results" title="Results">
              <BulletList items={project.sections.results} />
            </SectionCard>
            <SectionCard id="lessons" title="Lessons Learned">
              <ParagraphList items={project.sections.lessons} />
            </SectionCard>
          </div>

          <SectionCard id="links" title="Links / Actions">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkAction href="/projects">Back to Projects</LinkAction>
              {project.links.demo ? (
                <LinkAction href={project.links.demo}>View Live Demo</LinkAction>
              ) : null}
              {project.links.github ? (
                <LinkAction href={project.links.github}>View GitHub</LinkAction>
              ) : null}
              {project.links.caseStudy ? (
                <LinkAction href={project.links.caseStudy}>View Case Study</LinkAction>
              ) : null}
              {project.links.codeRequest ? (
                <StaticAction>Code available on request.</StaticAction>
              ) : null}
              {project.links.demoRequest ? (
                <StaticAction>Demo available on request.</StaticAction>
              ) : null}
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}

function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[30px] border border-white/10 bg-slate-950/72 px-6 py-6 shadow-[0_32px_90px_rgba(2,6,23,0.38)] sm:px-7 sm:py-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
        {title}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ParagraphList({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <p key={item} className="max-w-4xl text-sm leading-8 text-slate-300">
          {item}
        </p>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function MetadataRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: ProjectDetail["statusTone"];
}) {
  const toneClass =
    tone === "winner"
      ? "text-emerald-300"
      : tone === "research"
        ? "text-violet-300"
        : "text-cyan-200";

  return (
    <div className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </dt>
      <dd className={`mt-2 text-sm leading-7 ${tone ? toneClass : "text-slate-200"}`}>
        {value}
      </dd>
    </div>
  );
}

function LinkAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/12 hover:text-white"
    >
      {children}
    </Link>
  );
}

function StaticAction({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
      {children}
    </span>
  );
}
