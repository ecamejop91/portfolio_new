"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Image from "next/image";

type InspectionKey = "recruiter" | "professional" | "technical" | "personal" | "timeline";
type HighlightTag =
  | "summary"
  | "experience"
  | "impact"
  | "skills"
  | "stack"
  | "projects"
  | "values"
  | "persistence"
  | "connector"
  | "journey";

type SystemNode =
  | "persistence"
  | "connector"
  | "engineering"
  | "ai"
  | "backend"
  | "cloud"
  | "linux"
  | "data"
  | "projects"
  | "experience";

type FloatingShapeState = {
  cycle: number;
  durationMs: number;
  leftPx: number;
  topPx: number;
  sizePx: number;
  travelPx: number;
  src: string;
};

const foundationInsights: {
  title: string;
  text: string;
  icon: "listen" | "system" | "dependable";
  tags: HighlightTag[];
}[] = [
  {
    title: "Listening before solving",
    text: "Understanding what the client actually needed before deciding what the technical fix should be.",
    icon: "listen",
    tags: ["connector", "experience", "values"],
  },
  {
    title: "Seeing the whole system",
    text: "Working across devices, networks, software, workflows, and people instead of treating problems as isolated tickets.",
    icon: "system",
    tags: ["skills", "impact", "connector"],
  },
  {
    title: "Becoming dependable",
    text: "Building trust by following through, communicating clearly, and making technology easier for the people using it.",
    icon: "dependable",
    tags: ["persistence", "values", "experience"],
  },
];

type StageCardIcon =
  | "listen"
  | "system"
  | "dependable"
  | "automation"
  | "telehealth"
  | "operations"
  | "academics"
  | "certification"
  | "internship"
  | "leadership"
  | "engineering"
  | "ml"
  | "project"
  | "future";

type StageDetailItem = {
  eyebrow: string;
  title: string;
  text: string;
  tags: HighlightTag[];
  icon: StageCardIcon;
  tech?: string[];
};

const inspectionHighlights: Record<InspectionKey, HighlightTag[]> = {
  recruiter: ["summary", "impact", "experience"],
  professional: ["experience", "impact", "summary"],
  technical: ["skills", "stack", "projects"],
  personal: ["values", "persistence", "connector"],
  timeline: ["journey", "persistence", "impact"],
};

const inspections: Record<
  InspectionKey,
  {
    eyebrow: string;
    title: string;
    command: string;
    summary: string;
    sections: { label: string; text: string }[];
  }
> = {
  recruiter: {
    eyebrow: "Recruiter Scan",
    title: "Candidate snapshot",
    command: "scan /resume /impact /fit",
    summary:
      "Computer Science student at Tennessee State University, GPA 3.9. Expected graduation: May 2027. Experience across HCA Healthcare, Google STEP, Boston Scientific, and IT consulting.",
    sections: [
      {
        label: "Snapshot",
        text: "A non-traditional computer science student with internship and project experience across big tech, healthcare, finance, and IT consulting. Comfortable working in corporate environments, cross-functional teams, and systems where reliability and communication matter.",
      },
      {
        label: "Impact",
        text: "Built patient-data Machine Learning infrastructure at HCA, supported Fitbit service operations at Google, and contributed to telehealth systems across 15 countries.",
      },
      {
        label: "Strengths",
        text: "Python, Java, Kotlin, SQL, Linux, Git, backend systems, Docker, Google Cloud, BigQuery, Kafka. ",
      },
      {
        label: "Contact",
        text: "ecamejop@my.tnstate.edu | linkedin.com/in/eliecer-camejo",
      },
    ],
  },
  professional: {
    eyebrow: "Professional",
    title: "Execution across real systems",
    command: "inspect /experience /scale",
    summary:
      "My professional path moves from IT consulting and system administration into corporate-scale software engineering and cloud ML systems.",
    sections: [
      {
        label: "HCA Healthcare",
        text: "ITG Pathways Intern, May-Aug 2025. Prototyped ML pipelines with Google Cloud, Vertex AI, BigQuery, Kafka, Kubernetes, and Argo CD.",
      },
      {
        label: "Google STEP",
        text: "May-Aug 2024. Built Kotlin RPC service work for Fitbit Account Services and wrote tests with over 90% coverage.",
      },
      {
        label: "Boston Scientific",
        text: "System Administrator, Jun 2021-Mar 2023. Supported 200+ telehealth devices across 15 countries.",
      },
    ],
  },
  technical: {
    eyebrow: "Technical",
    title: "Backend, data, ML, cloud",
    command: "inspect /stack /projects",
    summary:
      "I work across Python, Java, Kotlin, SQL, Linux, Git, Docker, Google Cloud, BigQuery, Kafka, backend systems, and applied ML infrastructure.",
    sections: [
      {
        label: "Cloud ML",
        text: "Google Cloud, Vertex AI, BigQuery, Kafka, Kubernetes, and Argo CD for patient-record model training workflows.",
      },
      {
        label: "Services",
        text: "Kotlin RPC service work, microservices migration, UI notification updates, design docs, and unit testing.",
      },
      {
        label: "Systems",
        text: "Linux, Docker, self-hosted services, Apache, Pi-hole, Nextcloud, Plex, and practical infrastructure ownership.",
      },
    ],
  },
  personal: {
    eyebrow: "Philosophy",
    title: "Useful first",
    command: "inspect /values /connector",
    summary:
      "I use technology as a vehicle to improve people's lives, building on the tools, systems, and opportunities created by larger institutions while adding my own discipline, curiosity, and execution.",
    sections: [
      {
        label: "Connector mindset",
        text: "I look for the bridge between people, institutions, tools, and practical outcomes.",
      },
      {
        label: "Human value",
        text: "Telehealth, patient data, education, search, and workflow tools matter because they reduce friction for real people.",
      },
      {
        label: "Path",
        text: "The non-traditional path is part of the signal: resilience, range, and seriousness earned through practice.",
      },
    ],
  },
  timeline: {
    eyebrow: "Timeline",
    title: "Journey spine",
    command: "inspect /sequence /growth",
    summary:
      "The path begins in IT consulting and systems administration, grows through CS study and Google STEP, then deepens into cloud ML and backend systems.",
    sections: [
      {
        label: "2020-2023",
        text: "IT consulting and system administration built operational range, device ownership, automation, and user support instincts.",
      },
      {
        label: "2024-2025",
        text: "Google STEP, TSU Career Center, and HCA Healthcare added software engineering, ML pipeline, and corporate-scale experience.",
      },
      {
        label: "2027",
        text: "Anticipated B.S. Computer Science graduation from Tennessee State University.",
      },
    ],
  },
};

const phases: {
  id: string;
  number: string;
  date: string;
  phase: string;
  title: string;
  summary: string;
  metrics?: { label: string; value: string }[];
  unlocked: { label: string; text: string; tags: HighlightTag[] }[];
  cards: { type: string; title: string; text: string; tags: HighlightTag[]; tech?: string[] }[];
}[] = [
  {
    id: "foundation",
    number: "01",
    date: "Aug 2020 - Mar 2021",
    phase: "Foundation",
    title: "IT consulting as a systems foundation",
    summary:
      "Years of IT support and network installation experience paved the way for my IT consulting role at Telluride Bytes. This role taught me the importance of carefully listening to clients and solving challenges holistically, beyond just software or hardware. It also shaped a client-first approach to my work, built on patience, trust, and clear communication. I learned to go the extra mile, build strong relationships, and become someone clients could rely on.",
    unlocked: [
      {
        label: "Workflow thinking",
        text: "Assisted businesses with IT solutions that optimized workflows, reduced costs, and improved compatibility.",
        tags: ["experience", "impact", "connector"],
      },
      {
        label: "Lifecycle ownership",
        text: "Coordinated hardware upgrades, decommissioning, and strategic repurposing.",
        tags: ["skills", "persistence"],
      },
    ],
    cards: [
      {
        type: "Experience",
        title: "Telluride Bytes",
        text: "Information Technology Consultant supporting businesses through modernization and practical technical planning.",
        tags: ["experience", "summary", "journey"],
      },
    ],
  },
  {
  //   id: "foundation-structured",
  //   number: "02",
  //   date: "Aug 2020 - Mar 2021",
  //   phase: "Foundation",
  //   title: "IT consulting as a systems foundation",
  //   summary:
  //     "Years of IT support and network installation experience paved the way for my IT consulting role at Telluride Bytes. This role taught me the importance of carefully listening to clients and solving challenges holistically, beyond just software or hardware. It also shaped a client-first approach to my work, built on patience, trust, and clear communication. I learned to go the extra mile, build strong relationships, and become someone clients could rely on.",
  //   unlocked: [
  //     {
  //       label: "Workflow thinking",
  //       text: "Assisted businesses with IT solutions that optimized workflows, reduced costs, and improved compatibility.",
  //       tags: ["experience", "impact", "connector"],
  //     },
  //     {
  //       label: "Lifecycle ownership",
  //       text: "Coordinated hardware upgrades, decommissioning, and strategic repurposing.",
  //       tags: ["skills", "persistence"],
  //     },
  //   ],
  //   cards: [
  //     {
  //       type: "Experience",
  //       title: "Telluride Bytes",
  //       text: "Information Technology Consultant supporting businesses through modernization and practical technical planning.",
  //       tags: ["experience", "summary", "journey"],
  //     },
  //   ],
  // },
  // {
    id: "systems",
    number: "02",
    date: "Jun 2021 - Mar 2023",
    phase: "Systems",
    title: "Healthcare technology at human scale",
    summary:
      "At Boston Scientific, systems work became people work: telehealth devices, training programs, automation, and technology access across countries.",
    unlocked: [
      {
        label: "Automation",
        text: "Designed a Python tool for QR code invitation generation, reducing manual work by 15 hours per week.",
        tags: ["skills", "impact", "stack"],
      },
      {
        label: "Telehealth impact",
        text: "Managed 200+ telehealth devices across 15 countries, helping doctors reach remote and underserved regions.",
        tags: ["experience", "impact", "values"],
      },
    ],
    cards: [
      {
        type: "Experience",
        title: "Boston Scientific",
        text: "System Administrator; increased company-wide tech utilization by about 60% through user training redesign.",
        tags: ["experience", "impact", "connector"],
        tech: ["Python", "Device management", "Training", "Telehealth"],
      },
    ],
  },
  {
    id: "engineering",
    number: "03",
    date: "2023 - May 2027",
    phase: "Computer Science Bachelors",
    title: "Scaling impact through computer science",
    summary:
      "Driven by a desire to increase the number of people I could positively affect through my work, I enrolled in the Computer Science bachelor's program at Tennessee State University. My goal was to learn the tools that could help me scale my reach and gain access to American corporations building services that continuously improve millions of lives. College exposed me to corporate environments across technology, healthcare, and finance-facing work through internship experiences that opened my mind to a wider field of possibilities. With an expected graduation in May 2027, I am looking for a professional path that aligns with my growth mindset, work-life balance, and personal fulfillment.",
    metrics: [
      { label: "Current GPA", value: "3.9" },
      { label: "Expected Graduation", value: "May 2027" },
      { label: "Professional Direction", value: "Growth, balance, fulfillment" },
    ],
    unlocked: [
      {
        label: "Academic foundation",
        text: "B.S. Computer Science, GPA 3.9, anticipated graduation May 2027.",
        tags: ["summary", "journey", "persistence"],
      },
      {
        label: "Certifications",
        text: "Certified Scrum Master & Product Owner, May 2022; Stanford-Coursera Supervised Machine Learning, Feb 2024.",
        tags: ["skills", "stack", "values"],
      },
      {
        label: "Corporate exposure",
        text: "Internship experiences opened access to how large organizations build, maintain, and improve systems at scale.",
        tags: ["experience", "impact", "connector"],
      },
    ],
    cards: [
      {
        type: "Leadership",
        title: "TSU Career Center",
        text: "Served as Student Ambassador from 2024 to 2025.",
        tags: ["experience", "connector", "values"],
      },
      {
        type: "Experience",
        title: "Google STEP Intern",
        text: "May-Aug 2024. Developed a Kotlin RPC service for Fitbit Account Services, contributed to microservices migration, updated invitations and notifications, and wrote tests achieving over 90% code coverage.",
        tags: ["experience", "impact", "stack"],
        tech: ["Kotlin", "RPC", "JavaScript", "HTML", "Unit tests"],
      },
      {
        type: "Experience",
        title: "HCA Healthcare ITG Pathways Intern",
        text: "May-Aug 2025. Prototyped ML pipelines with Google Cloud, Vertex AI, and BigQuery; built a Python Kafka consumer streaming about 12 million patient records daily for model training.",
        tags: ["experience", "impact", "summary"],
        tech: ["Python", "Kafka", "Google Cloud", "Vertex AI", "BigQuery", "Kubernetes", "Argo CD"],
      },
      {
        type: "Experience",
        title: "Finance internship placeholder",
        text: "Placeholder: add finance internship company, dates, role, tools, and measurable impact here.",
        tags: ["experience", "summary", "impact"],
        tech: ["Finance domain", "Systems", "Data", "Impact"],
      },
      {
        type: "Project",
        title: "Fisk & TSU Google Hackathon",
        text: "Developed a web platform to connect colleges with businesses.",
        tags: ["projects", "connector", "impact"],
        tech: ["Web platform", "Product thinking", "Collaboration"],
      },
      {
        type: "Project Direction",
        title: "AI-enabled systems with human value",
        text: "The next layer is deeper backend, cloud, data, and ML work where technical systems improve outcomes people can feel.",
        tags: ["values", "connector", "journey"],
      },
    ],
  },
  {
    id: "next",
    number: "04",
    date: "Next chapter",
    phase: "Professional Path",
    title: "Growth, balance, and useful impact",
    summary:
      "With graduation ahead, I am looking for a professional path that develops my technical range while preserving the conditions that make long-term growth, work-life balance, and personal fulfillment possible.",
    unlocked: [
      {
        label: "Professional fit",
        text: "A role where backend, cloud, data, and AI systems can improve services at meaningful scale.",
        tags: ["values", "impact", "connector"],
      },
      {
        label: "Growth conditions",
        text: "A team and environment aligned with learning, execution, balance, and durable contribution.",
        tags: ["journey", "persistence", "values"],
      },
    ],
    cards: [],
  },
];

const overviewCards = [
  ["Graduation", "Anticipated May 2027"],
  ["Current role", "Global Technology Intern, Bank of America"],
  ["Core stack", "Python, SQL, Google Cloud, Docker, Linux"],
];

const snapshotProjects = [
  ["Featured Work", "Sona AI interview platform", "View project ->"],
  ["Current Build", "Local semantic document search", "View project ->"],
];

const graphNodes: { key: SystemNode; label: string; tags: HighlightTag[] }[] = [
  { key: "persistence", label: "Persistence", tags: ["persistence", "journey"] },
  { key: "connector", label: "Connector", tags: ["connector", "values"] },
  { key: "engineering", label: "Engineering Mindset", tags: ["skills", "values"] },
  { key: "ai", label: "AI / ML", tags: ["skills", "stack"] },

  { key: "backend", label: "Backend", tags: ["skills", "stack"] },
  { key: "cloud", label: "Google Cloud", tags: ["skills", "stack"] },
  { key: "linux", label: "Linux / Docker", tags: ["skills", "persistence"] },
  { key: "data", label: "BigQuery / Kafka", tags: ["skills", "projects"] },
  { key: "projects", label: "Projects", tags: ["projects", "impact"] },
  { key: "experience", label: "Professional Experience", tags: ["experience", "impact"] },
];

export default function Home() {
  const [activeInspection, setActiveInspection] = useState<InspectionKey | null>(null);
  const [activeNode, setActiveNode] = useState<SystemNode | null>(null);
  const [uptimeMinutes, setUptimeMinutes] = useState(0);
  const [backgroundShapePngs, setBackgroundShapePngs] = useState<string[]>([]);
  const highlightedTags = activeInspection
    ? inspectionHighlights[activeInspection]
    : activeNode
      ? graphNodes.find((node) => node.key === activeNode)?.tags ?? []
      : [];

  useEffect(() => {
    const startedAt = Date.now();
    const updateUptime = () => {
      setUptimeMinutes(Math.floor((Date.now() - startedAt) / 60000));
    };

    updateUptime();
    const interval = window.setInterval(updateUptime, 30000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
    <main className="relative min-h-screen bg-[#f3f7fb] text-neutral-950">
      <LayeredBackground
        activeInspection={activeInspection}
        backgroundShapePngs={backgroundShapePngs}
      />

      <div className="page-zoom relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="glass-opaque flex items-center justify-between gap-4 rounded-[28px] px-4 py-3 text-[13px] text-neutral-600 sm:rounded-full">
          <a href="#top" className="font-medium text-neutral-950">
            Eliecer Camejo
          </a>
          <nav className="hidden items-center gap-5 md:flex">
            <a className="hover:text-neutral-950" href="#work">
              Work
            </a>
            <a className="hover:text-neutral-950" href="#journey">
              Journey
            </a>
            <a className="hover:text-neutral-950" href="#top">
              Top
            </a>
          </nav>
        </header>
        <div className="mt-2 flex justify-end pr-2">
          <UptimeBadge minutes={uptimeMinutes} />
        </div>

        <section
          id="top"
          className="grid items-start gap-5 py-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.95fr)]"
        >
          <div className="mt-[100px] max-w-4xl">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Portfolio as a system map
            </p>
<h1 className="max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
  Working on systems that improve people’s lives.
</h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
              
            My journey started in IT, where I helped people use technology directly, from small groups to hundreds of users. Through that experience, I realized that helping others is a strong driver for me. Now, I am in college acquiring the skills to positively impact as many people as possible by contributing to the companies and systems that shape our technological landscape at a global scale.</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Current Stage", "CS student + engineer"],
                ["Technical Direction", "AI, cloud, backend systems"],
                ["Operating Principle", "Build useful systems"],
              ].map(([label, value]) => (
                <StatusIndicator key={label} label={label} value={value} />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setActiveInspection("recruiter")}
                className="h-11 rounded-full bg-neutral-950 px-5 text-[13px] font-medium text-white shadow-sm transition hover:bg-neutral-800"
              >
                30-second overview
              </button>
              <a
                href="#journey"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("journey");
                }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/35 px-5 text-[13px] font-medium text-neutral-900 backdrop-blur-xl transition hover:bg-sky-50/65"
              >
                Explore the system
              </a>
              <button
                type="button"
                onClick={() => scrollToId("work")}
                className="h-11 rounded-full border border-sky-900/10 bg-sky-50/25 px-5 text-[13px] font-medium text-neutral-900 backdrop-blur-xl transition hover:bg-sky-50/60"
              >
                Technical work
              </button>
            </div>
          </div>

          <aside className="glass-float rounded-[20px] p-5 mt-[100px]">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-950/8 pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                At a Glance
              </p>
            </div>
            <div className="space-y-3">
              {overviewCards.map(([label, value]) => (
                <div
                  key={label}
                  className={snapshotCardState(["summary", "skills"], highlightedTags)}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {label}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-neutral-950">
                    {value}
                  </span>
                </div>
              ))}
              {snapshotProjects.map(([label, text, cta]) => (
                <div
                  key={label}
                  className="rounded-[22px] border border-sky-900/12 bg-sky-50/28 p-3 backdrop-blur-2xl"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {label}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-neutral-900">
                    {text}
                  </span>
                  <span className="mt-2 inline-flex text-[11px] font-medium text-sky-700">
                    {cta}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="journey" className="relative scroll-mt-20 py-12 md:py-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent lg:left-[17.65rem] lg:block" />
          <div className="mb-7 mt-[100px] lg:ml-80">
            <SectionIntro
              eyebrow="My Timeline"
              title="Experience Deep Dive"
              text="A closer look at the roles, projects, and lessons that shaped my path."
            />
          </div>

          <div className="space-y-6">
            {phases.map((phase) => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                highlightedTags={highlightedTags}
              />
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-20 py-12 md:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              eyebrow="System graph"
              title="How the pieces connect"
              text="Click a node to highlight related timeline cards. This is the connector layer: people, systems, tools, projects, and impact."
            />
            <div className="glass-opaque relative rounded-[28px] p-5">
              <div className="pointer-events-none absolute inset-8 hidden rounded-[2rem] border border-dashed border-neutral-950/10 md:block" />
              <div className="relative grid gap-3 sm:grid-cols-2">
                {graphNodes.map((node) => (
                  <button
                    key={node.key}
                    type="button"
                    onClick={() => setActiveNode(activeNode === node.key ? null : node.key)}
                    className={`glass-lift rounded-2xl border p-4 text-left text-[13px] ${
                      activeNode === node.key || isHighlighted(node.tags, highlightedTags)
                        ? "border-sky-900/20 bg-sky-50/75 text-neutral-950 shadow-sm"
                        : "border-white/65 bg-sky-50/25 text-neutral-600 hover:bg-sky-50/60"
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                      Node
                    </span>
                    <span className="mt-2 block font-semibold">{node.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {activeInspection ? (
        <InspectionPanel
          panelKey={activeInspection}
          onClose={() => setActiveInspection(null)}
        />
      ) : null}
    </main>
  );
}

function LayeredBackground({
  activeInspection,
  backgroundShapePngs,
}: {
  activeInspection: InspectionKey | null;
  backgroundShapePngs: string[];
}) {
  const [shapeStates, setShapeStates] = useState<FloatingShapeState[]>([]);
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

    // Fallback if dense: place anyway, but stay in-bounds.
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

  useEffect(() => {
    if (backgroundShapePngs.length === 0) {
      setShapeStates([]);
      return;
    }

    const initialStates: FloatingShapeState[] = [];
    backgroundShapePngs.forEach((src) => {
      initialStates.push(makeShapeState(src, initialStates, null));
    });
    setShapeStates(initialStates);
  }, [backgroundShapePngs]);

  const handleShapeCycleEnd = (index: number, cycle: number) => {
    setShapeStates((prev) => {
      const current = prev[index];
      if (!current || current.cycle !== cycle) {
        return prev;
      }

      const updated = makeShapeState(current.src, prev, index, current.cycle + 1);
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="system-grid absolute inset-0 opacity-70" />
      <div className="system-shape-field absolute inset-0">
        {shapeStates.map((shape, index) => {
          return (
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
          );
        })}
      </div>
      <div
        className={`system-light-slow absolute left-1/2 top-[-8rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-700 ${
          activeInspection === "technical"
            ? "bg-sky-300/42"
            : activeInspection === "personal"
              ? "bg-blue-100/70"
              : "bg-sky-100/65"
        }`}
      />
      <div
        className={`system-light-fast absolute bottom-[6%] right-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl transition-colors duration-700 ${
          activeInspection === "professional" || activeInspection === "recruiter"
            ? "bg-blue-200/48"
            : "bg-sky-200/45"
        }`}
      />
      <div className="absolute left-[8%] top-[18%] hidden h-px w-72 bg-gradient-to-r from-transparent via-sky-700/14 to-transparent md:block" />
      <div className="absolute bottom-[20%] right-[16%] hidden h-px w-56 bg-gradient-to-r from-transparent via-sky-50/85 to-transparent md:block" />
    </div>
  );
}

function PhaseSection({
  phase,
  highlightedTags,
}: {
  phase: (typeof phases)[number];
  highlightedTags: HighlightTag[];
}) {
  if (phase.id === "foundation") {
    return <FoundationStageCard phase={phase} highlightedTags={highlightedTags} />;
  }

  return <ThemedStageCard phase={phase} highlightedTags={highlightedTags} />;
}

function FoundationStageCard({
  phase,
  highlightedTags,
}: {
  phase: (typeof phases)[number];
  highlightedTags: HighlightTag[];
}) {
  return (
    <article
      id={phase.id}
      className="glass-clear relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-9"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)] lg:gap-10">
        <div className="relative flex flex-col lg:pr-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/70 text-[13px] font-semibold text-neutral-900 shadow-sm">
              {phase.number}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-600">
                {phase.phase}
              </p>
              <p className="mt-1 text-[13px] text-neutral-500">{phase.date}</p>
            </div>
          </div>

          <h2 className="mt-8 max-w-2xl text-[2rem] font-semibold tracking-[-0.03em] text-neutral-950 sm:text-[2.35rem]">
            {phase.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-8 text-neutral-600">
            {phase.summary}
          </p>

          <div className="mt-8 hidden lg:block lg:pt-6">
            <StageArtwork stageId={phase.id} />
          </div>
        </div>

        <div className="lg:border-l lg:border-neutral-950/8 lg:pl-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
            What this stage unlocked
          </p>

          <div className="mt-6 space-y-4">
            {foundationInsights.map((insight) => (
              <div
                key={insight.title}
                className={`glass-lift relative flex gap-4 rounded-[22px] border px-5 py-5 backdrop-blur-2xl ${
                  isHighlighted(insight.tags, highlightedTags)
                    ? "border-sky-900/18 bg-sky-50/78 shadow-[0_16px_50px_rgba(30,64,175,0.12)]"
                    : "border-white/65 bg-sky-50/32"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-900/8 bg-sky-50/35 text-sky-700">
                  <FoundationInsightIcon icon={insight.icon} />
                </div>
                <div className="pr-2">
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-neutral-950">
                    {insight.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-neutral-600">
                    {insight.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ThemedStageCard({
  phase,
  highlightedTags,
}: {
  phase: (typeof phases)[number];
  highlightedTags: HighlightTag[];
}) {
  const detailItems = buildStageDetailItems(phase);

  return (
    <article
      id={phase.id}
      className="glass-clear relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-9"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-10">
        <div className="relative flex flex-col lg:pr-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/70 text-[13px] font-semibold text-neutral-900 shadow-sm">
              {phase.number}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-600">
                {phase.phase}
              </p>
              <p className="mt-1 text-[13px] text-neutral-500">{phase.date}</p>
            </div>
          </div>

          <h2 className="mt-8 max-w-2xl text-[2rem] font-semibold tracking-[-0.03em] text-neutral-950 sm:text-[2.35rem]">
            {phase.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-8 text-neutral-600">
            {phase.summary}
          </p>

          {phase.metrics ? (
            <div className="mt-6 grid gap-2 sm:max-w-xl sm:grid-cols-3">
              {phase.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-sky-900/8 bg-sky-50/35 p-3 backdrop-blur-2xl"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-neutral-950">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-8 hidden overflow-hidden lg:block lg:h-[220px]">
            <StageArtwork stageId={phase.id} />
          </div>
        </div>

        <div className="lg:border-l lg:border-neutral-950/8 lg:pl-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
            What this stage unlocked
          </p>

          <div className="mt-6 space-y-4">
            {detailItems.map((item) => (
              <div
                key={`${phase.id}-${item.eyebrow}-${item.title}`}
                className={`glass-lift relative flex gap-4 rounded-[22px] border px-5 py-5 backdrop-blur-2xl ${
                  isHighlighted(item.tags, highlightedTags)
                    ? "border-sky-900/18 bg-sky-50/78 shadow-[0_16px_50px_rgba(30,64,175,0.12)]"
                    : "border-white/65 bg-sky-50/32"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-900/8 bg-sky-50/35 text-sky-700">
                  <StageDetailIcon icon={item.icon} />
                </div>
                <div className="min-w-0 pr-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.01em] text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-neutral-600">
                    {item.text}
                  </p>
                  {item.tech ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-sky-900/8 bg-white/55 px-2.5 py-1 text-[11px] text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function buildStageDetailItems(phase: (typeof phases)[number]): StageDetailItem[] {
  if (phase.id === "foundation-structured") {
    return foundationInsights.map((insight) => ({
      eyebrow: "Unlocks",
      title: insight.title,
      text: insight.text,
      tags: insight.tags,
      icon: insight.icon,
    }));
  }

  if (phase.id === "systems") {
    return [
      {
        eyebrow: "Unlocks",
        title: "Automation",
        text: "Designed a Python tool for QR code invitation generation, reducing manual work by 15 hours per week.",
        tags: ["skills", "impact", "stack"],
        icon: "automation",
      },
      {
        eyebrow: "Unlocks",
        title: "Telehealth impact",
        text: "Managed 200+ telehealth devices across 15 countries, helping doctors reach remote and underserved regions.",
        tags: ["experience", "impact", "values"],
        icon: "telehealth",
      },
      {
        eyebrow: "Experience",
        title: "Boston Scientific",
        text: "System Administrator; increased company-wide tech utilization by about 60% through user training redesign.",
        tags: ["experience", "impact", "connector"],
        icon: "operations",
        tech: ["Python", "Device management", "Training", "Telehealth"],
      },
    ];
  }

  if (phase.id === "engineering") {
    return [
      {
        eyebrow: "Unlocks",
        title: "Academic foundation",
        text: "B.S. Computer Science, GPA 3.9, anticipated graduation May 2027.",
        tags: ["summary", "journey", "persistence"],
        icon: "academics",
      },
      {
        eyebrow: "Unlocks",
        title: "Certifications",
        text: "Certified Scrum Master & Product Owner, May 2022; Stanford-Coursera Supervised Machine Learning, Feb 2024.",
        tags: ["skills", "stack", "values"],
        icon: "certification",
      },
      {
        eyebrow: "Unlocks",
        title: "Corporate exposure",
        text: "Internship experiences opened access to how large organizations build, maintain, and improve systems at scale.",
        tags: ["experience", "impact", "connector"],
        icon: "internship",
      },
      {
        eyebrow: "Leadership",
        title: "TSU Career Center",
        text: "Served as Student Ambassador from 2024 to 2025.",
        tags: ["experience", "connector", "values"],
        icon: "leadership",
      },
      {
        eyebrow: "Experience",
        title: "Google STEP Intern",
        text: "May-Aug 2024. Developed a Kotlin RPC service for Fitbit Account Services, contributed to microservices migration, updated invitations and notifications, and wrote tests achieving over 90% code coverage.",
        tags: ["experience", "impact", "stack"],
        icon: "engineering",
        tech: ["Kotlin", "RPC", "JavaScript", "HTML", "Unit tests"],
      },
      {
        eyebrow: "Experience",
        title: "HCA Healthcare ITG Pathways Intern",
        text: "May-Aug 2025. Prototyped ML pipelines with Google Cloud, Vertex AI, and BigQuery; built a Python Kafka consumer streaming about 12 million patient records daily for model training.",
        tags: ["experience", "impact", "summary"],
        icon: "ml",
        tech: ["Python", "Kafka", "Google Cloud", "Vertex AI", "BigQuery", "Kubernetes", "Argo CD"],
      },
      {
        eyebrow: "Project",
        title: "Fisk & TSU Google Hackathon",
        text: "Developed a web platform to connect colleges with businesses.",
        tags: ["projects", "connector", "impact"],
        icon: "project",
        tech: ["Web platform", "Product thinking", "Collaboration"],
      },
      {
        eyebrow: "Direction",
        title: "AI-enabled systems with human value",
        text: "The next layer is deeper backend, cloud, data, and ML work where technical systems improve outcomes people can feel.",
        tags: ["values", "connector", "journey"],
        icon: "future",
      },
    ];
  }

  return [
    {
      eyebrow: "Unlocks",
      title: "Professional fit",
      text: "A role where backend, cloud, data, and AI systems can improve services at meaningful scale.",
      tags: ["values", "impact", "connector"],
      icon: "future",
    },
    {
      eyebrow: "Unlocks",
      title: "Growth conditions",
      text: "A team and environment aligned with learning, execution, balance, and durable contribution.",
      tags: ["journey", "persistence", "values"],
      icon: "dependable",
    },
  ];
}

function FoundationInsightIcon({ icon }: { icon: "listen" | "system" | "dependable" }) {
  if (icon === "listen") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 10.5a4 4 0 1 1 8 0c0 4.3-2 5.1-2 7.2a2 2 0 0 1-4 0" />
        <path d="M9.7 20.2c.4 1 1.3 1.8 2.3 1.8s1.9-.8 2.3-1.8" />
        <path d="M5 11.2c0-3.9 3.1-7.2 7-7.2" />
      </svg>
    );
  }

  if (icon === "system") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="4" width="6" height="6" rx="1.2" />
        <rect x="14.5" y="4" width="6" height="6" rx="1.2" />
        <rect x="9" y="14" width="6" height="6" rx="1.2" />
        <path d="M9.5 7h5M12 10v4" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5l6 2.6v5.6c0 4-2.4 7.4-6 8.8-3.6-1.4-6-4.8-6-8.8V6.1l6-2.6Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </svg>
  );
}

function StageDetailIcon({ icon }: { icon: StageCardIcon }) {
  if (icon === "listen" || icon === "system" || icon === "dependable") {
    return <FoundationInsightIcon icon={icon} />;
  }

  if (icon === "automation") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v4M12 17v4M4 12H8M16 12h4" />
        <path d="m6.2 6.2 2.8 2.8M15 15l2.8 2.8M17.8 6.2 15 9M9 15l-2.8 2.8" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    );
  }

  if (icon === "telehealth") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M9 21h6M12 17v4M8.5 11.5h7" />
        <path d="M12 8v7" />
      </svg>
    );
  }

  if (icon === "operations") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="7" height="7" rx="1.2" />
        <rect x="13" y="4" width="7" height="7" rx="1.2" />
        <rect x="8.5" y="13" width="7" height="7" rx="1.2" />
        <path d="M11 7.5h2M12 11v2" />
      </svg>
    );
  }

  if (icon === "academics") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-4 9 4-9 4-9-4Z" />
        <path d="M7 10.8V15c0 1.3 2.2 2.5 5 2.5s5-1.2 5-2.5v-4.2" />
      </svg>
    );
  }

  if (icon === "certification") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="9" r="4" />
        <path d="M10 13.5 8 21l4-2.3L16 21l-2-7.5" />
      </svg>
    );
  }

  if (icon === "internship") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 6V4h6v2M4 11h16" />
      </svg>
    );
  }

  if (icon === "leadership") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4 14.1 8.2 19 8.8l-3.6 3.4.9 4.8L12 14.8 7.7 17l.9-4.8L5 8.8l4.9-.6L12 4Z" />
      </svg>
    );
  }

  if (icon === "engineering") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
      </svg>
    );
  }

  if (icon === "ml") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 12h4M14 12l2.3-4M14 12l2.3 4" />
      </svg>
    );
  }

  if (icon === "project") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19c6-1.5 9.8-5.3 11.8-11.5" />
      <path d="M13 7h4v4" />
      <path d="M4 19h16" />
    </svg>
  );
}

function StageIllustration({ stageId }: { stageId: string }) {
  if (stageId === "systems") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 420 140"
        className="h-[120px] w-full max-w-[360px] text-sky-200/55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 112h384" />
        <path d="M36 112V54" />
        <path d="M36 58c10 0 16 6 16 14 0 6-4 9-8 12-4 3-8 6-8 12" />
        <path d="M30 66c2-4 6-6 10-6 5 0 8 3 8 7 0 3-2 5-5 7-3 2-7 5-7 10" />
        <path d="M28 78h16" />
        <path d="M28 88h16" />

        <circle cx="178" cy="67" r="23" />
        <path d="M164 66c3-5 8-8 14-8s11 3 14 8" />
        <path d="M167 66c0 2 1 3 3 3s3-1 3-3-1-3-3-3-3 1-3 3Z" />
        <path d="M183 66c0 2 1 3 3 3s3-1 3-3-1-3-3-3-3 1-3 3Z" />
        <path d="M170 64h10M180 64h10" />
        <path d="M168 79c4 4 16 4 20 0" />
        <path d="M164 79c2 10 8 15 14 15s12-5 14-15" />
        <path d="M167 79h22" />

        <path d="M236 82h20l6-10 8 20 8-12h12l8-10 6 12h18" />
        <path d="M232 96h96" />

        <rect x="338" y="56" width="46" height="34" rx="6" />
        <path d="M350 68h22M361 58v22" />
        <path d="M344 98h34" />
      </svg>
    );
  }

  if (stageId === "engineering") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 420 140"
        className="h-[120px] w-full max-w-[360px] text-sky-200/55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 112h384" />
        <path d="M34 112V78h46v34" />
        <path d="M58 54 88 78H28l30-24Z" />
        <path d="M47 90h6M63 90h6" />
        <rect x="142" y="74" width="82" height="24" rx="5" />
        <path d="M154 98h58M166 74V62h34v12" />
        <path d="m258 92 22-20 20 10 28-24" />
        <path d="M324 58h12v12" />
        <path d="M310 112h34" />
        <circle cx="310" cy="84" r="5" />
        <circle cx="346" cy="76" r="5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 140"
      className="h-[120px] w-full max-w-[360px] text-sky-200/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 112h384" />
      <path d="M34 112 92 72l30 26 18-14 34 28" />
      <path d="M210 112c10-26 28-40 50-40 16 0 29 7 42 22" />
      <path d="m292 56 24-2-2 24" />
      <path d="M230 112h86" />
      <circle cx="354" cy="70" r="10" />
      <path d="M354 60v20M344 70h20" />
    </svg>
  );
}

function StageArtwork({ stageId }: { stageId: string }) {
  if (stageId === "foundation" || stageId === "foundation-structured") {
    return (
      <Image
        src="/Art/Telluride.png"
        alt=""
        width={720}
        height={220}
        className="h-[180px] w-full max-w-2xl object-contain opacity-30"
        aria-hidden
      />
    );
  }

  if (stageId === "systems") {
    return (
      <Image
        src="/Art/Boston.png"
        alt=""
        width={720}
        height={220}
        className="h-[180px] w-full max-w-2xl  object-contain opacity-30"
        aria-hidden
      />
    );
  }

  return <StageIllustration stageId={stageId} />;
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-neutral-950 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-[14px] leading-6 text-neutral-600">{text}</p>
    </div>
  );
}

function StatusIndicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-clear glass-lift rounded-2xl p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-[13px] font-semibold text-neutral-950">{value}</p>
    </div>
  );
}

function UptimeBadge({ minutes }: { minutes: number }) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return (
    <div className="group relative">
      <div className="rounded-full border border-emerald-500/15 bg-emerald-50/45 px-3 py-1.5 shadow-sm backdrop-blur-2xl">
        <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
          Uptime
        </span>
        <span className="font-mono text-[12px] font-semibold text-emerald-600">
          {String(hours).padStart(2, "0")}h {String(remainingMinutes).padStart(2, "0")}m
        </span>
      </div>
      <div className="pointer-events-none absolute right-0 top-[calc(100%+0.65rem)] z-30 w-72 translate-y-1 rounded-2xl border border-white/75 bg-sky-50/88 p-4 text-left opacity-0 shadow-[0_24px_70px_rgba(30,64,175,0.16)] backdrop-blur-3xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Self-hosted system
        </p>
        <p className="mt-2 text-[13px] leading-6 text-neutral-700">
          This portfolio is self-hosted on my personal server, which is one of my hobbies and a way I keep learning infrastructure by running real
          services.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Docker", "Caddy"].map(
            (tool) => (
              <span
                key={tool}
                className="rounded-full border border-sky-900/8 bg-white/55 px-2.5 py-1 text-[11px] text-neutral-600"
              >
                {tool}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function InspectionPanel({
  panelKey,
  onClose,
}: {
  panelKey: InspectionKey;
  onClose: () => void;
}) {
  const panel = inspections[panelKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/18 p-3 backdrop-blur-md sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspection-title"
      onClick={onClose}
    >
      <section
        className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-white/75 bg-sky-50/80 shadow-[0_35px_120px_rgba(30,64,175,0.2)] backdrop-blur-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5 border-b border-neutral-950/8 px-5 py-4">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              {panel.eyebrow}
            </p>
            <h2
              id="inspection-title"
              className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-neutral-950"
            >
              {panel.title}
            </h2>
            <p className="mt-1 text-[14px] leading-6 text-neutral-500">
              {panel.command}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/55 text-lg leading-none text-neutral-500 transition hover:bg-white hover:text-neutral-950"
            aria-label="Close panel"
          >
            x
          </button>
        </div>
        <div className="space-y-6 p-7 sm:p-10">
          <p className="text-[19px] leading-9 text-neutral-700">{panel.summary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {panel.sections.map((section) => (
              <div
                key={section.label}
                className="rounded-2xl border border-sky-900/8 bg-sky-50/45 p-4"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {section.label}
                </p>
                {panelKey === "recruiter" && section.label === "Contact" ? (
                  <div className="mt-3 space-y-2 text-[17px] leading-8 text-neutral-600">
                    <a
                      href="mailto:ecamejop@my.tnstate.edu"
                      className="block text-sky-800 hover:text-sky-900"
                    >
                      Email: ecamejop@my.tnstate.edu
                    </a>
                    <a
                      href="https://www.linkedin.com/in/eliecer-camejo"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sky-800 hover:text-sky-900"
                    >
                      LinkedIn: /in/eliecer-camejo
                    </a>
                  </div>
                ) : (
                  <p className="mt-3 text-[17px] leading-8 text-neutral-600">
                    {section.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function isHighlighted(cardTags: HighlightTag[], highlightedTags: HighlightTag[]) {
  return cardTags.some((tag) => highlightedTags.includes(tag));
}

function cardState(cardTags: HighlightTag[], highlightedTags: HighlightTag[]) {
  const active = isHighlighted(cardTags, highlightedTags);

  return `glass-lift rounded-[22px] border p-4 backdrop-blur-2xl ${
    active
      ? "border-sky-900/18 bg-sky-50/78 shadow-[0_16px_50px_rgba(30,64,175,0.12)]"
      : "border-white/65 bg-sky-50/32"
  }`;
}

function snapshotCardState(cardTags: HighlightTag[], highlightedTags: HighlightTag[]) {
  const active = isHighlighted(cardTags, highlightedTags);

  return `rounded-[22px] border p-3 backdrop-blur-2xl ${
    active
      ? "border-sky-900/18 bg-sky-50/78 shadow-[0_16px_50px_rgba(30,64,175,0.12)]"
      : "border-white/65 bg-sky-50/32"
  }`;
}
