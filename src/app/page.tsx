"use client";

import { useEffect, useState } from "react";

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
      "Computer Science student at Tennessee State University, GPA 3.9, anticipated graduation May 2027. Experience spans HCA Healthcare, Google STEP, Boston Scientific, and IT consulting.",
    sections: [
      {
        label: "Snapshot",
        text: "CS student with backend, cloud, data, ML, Linux, Docker, Google Cloud, BigQuery, and Kafka experience.",
      },
      {
        label: "Impact",
        text: "Built patient-data ML infrastructure at HCA, Fitbit service work at Google, and telehealth systems support across 15 countries.",
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
      "Telluride Bytes gave me the first layer of the map: evaluating business technology, modernizing legacy equipment, and learning how technical decisions affect daily work.",
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
  ["Education", "B.S. Computer Science, TSU, GPA 3.9"],
  ["Graduation", "Anticipated May 2027"],
  ["Recent role", "HCA Healthcare ITG Pathways Intern"],
  ["Core stack", "Python, Kotlin, SQL, Linux, Docker, GCP"],
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

const inspectionOrder: InspectionKey[] = [
  "recruiter",
  "professional",
  "technical",
  "personal",
  "timeline",
];

export default function Home() {
  const [activeInspection, setActiveInspection] = useState<InspectionKey | null>(null);
  const [activeNode, setActiveNode] = useState<SystemNode | null>(null);
  const [uptimeMinutes, setUptimeMinutes] = useState(0);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f7fb] text-neutral-950">
      <LayeredBackground activeInspection={activeInspection} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="glass-opaque flex items-center justify-between gap-4 rounded-[28px] px-4 py-3 text-[13px] text-neutral-600 sm:rounded-full">
          <a href="#top" className="font-medium text-neutral-950">
            Eliecer Camejo
          </a>
          <nav className="hidden items-center gap-5 md:flex">
            <a className="hover:text-neutral-950" href="#scan">
              Scan
            </a>
            <a className="hover:text-neutral-950" href="#journey">
              Timeline
            </a>
            <a className="hover:text-neutral-950" href="#graph">
              Graph
            </a>
          </nav>
        </header>
        <div className="mt-2 flex justify-end pr-2">
          <UptimeBadge minutes={uptimeMinutes} />
        </div>

        <section
          id="top"
          className="grid min-h-[calc(100vh-5.25rem)] items-center gap-8 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.95fr)]"
        >
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              Portfolio as a system map
            </p>
<h1 className="max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
  Working on systems that improve people’s lives.
</h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
              I started in IT, helping people use technology.
That’s what drives me. Now I work on systems that aim to help more people, including systems used by thousands or even millions of people.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Mode", "Building"],
                ["Focus", "Cloud ML systems"],
                ["Principle", "Useful first"],
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
                className="inline-flex h-11 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/35 px-5 text-[13px] font-medium text-neutral-900 backdrop-blur-xl transition hover:bg-sky-50/65"
              >
                Explore the system
              </a>
              <button
                type="button"
                onClick={() => setActiveInspection("technical")}
                className="h-11 rounded-full border border-sky-900/10 bg-sky-50/25 px-5 text-[13px] font-medium text-neutral-900 backdrop-blur-xl transition hover:bg-sky-50/60"
              >
                Technical work
              </button>
            </div>
          </div>

          <aside className="glass-float glass-lift system-float rounded-[28px] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-950/8 pb-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                System snapshot
              </p>
              <span className="rounded-full border border-sky-900/10 bg-sky-50/45 px-3 py-1 text-[11px] font-medium text-neutral-700">
                Available
              </span>
            </div>
            <div className="space-y-3">
              {overviewCards.map(([label, value]) => (
                <div
                  key={label}
                  className={cardState(["summary", "skills"], highlightedTags)}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {label}
                  </span>
                  <span className="text-[13px] leading-5 text-neutral-800">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="scan" className="scroll-mt-10 pb-14">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionIntro
              eyebrow="Inspection layer"
              title="Choose your depth"
              text="Select a view and the system highlights the relevant experience, skills, values, and timeline signals underneath."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {inspectionOrder.map((key) => {
                const inspection = inspections[key];
                const active = activeInspection === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveInspection(key)}
                    className={`glass-lift rounded-[22px] border p-4 text-left backdrop-blur-2xl ${
                      active
                        ? "border-sky-900/20 bg-sky-50/75 shadow-[0_18px_55px_rgba(30,64,175,0.12)]"
                        : "border-white/65 bg-sky-50/35 hover:bg-sky-50/60"
                    }`}
                  >
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                      {inspection.eyebrow}
                    </span>
                    <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-neutral-950">
                      {inspection.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-5 text-neutral-500">
                      {inspection.command}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="journey" className="relative scroll-mt-10 py-8">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent lg:left-[17.65rem] lg:block" />
          <div className="mb-10 lg:ml-80">
            <SectionIntro
              eyebrow="Timeline spine"
              title="Real stages, real systems"
              text="The timeline is the structure of the page. Each phase unlocks related skills, projects, professional context, and personal philosophy."
            />
          </div>

          <div className="space-y-8">
            {phases.map((phase) => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                highlightedTags={highlightedTags}
              />
            ))}
          </div>
        </section>

        <section id="graph" className="scroll-mt-10 py-16">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
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
}: {
  activeInspection: InspectionKey | null;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="system-grid absolute inset-0 opacity-70" />
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
  return (
    <article
      id={phase.id}
      className="glass-clear relative grid min-h-[66vh] gap-6 rounded-[32px] p-5 lg:grid-cols-[17rem_1fr] lg:p-7"
    >
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-900/10 bg-sky-50/65 text-[12px] font-semibold text-neutral-900 shadow-sm">
            {phase.number}
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              {phase.phase}
            </p>
            <p className="mt-1 text-[12px] text-neutral-500">{phase.date}</p>
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-neutral-950 sm:text-3xl">
          {phase.title}
        </h2>
        <p className="mt-3 text-[14px] leading-6 text-neutral-600">{phase.summary}</p>
        {phase.metrics ? (
          <div className="mt-5 grid gap-2">
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
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {phase.unlocked.map((item) => (
            <div key={item.label} className={cardState(item.tags, highlightedTags)}>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                Unlocks
              </p>
              <h3 className="mt-3 text-[16px] font-semibold text-neutral-950">
                {item.label}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className={phase.id === "engineering" ? "grid gap-3" : "grid gap-3 xl:grid-cols-2"}>
          {phase.cards.map((card) => (
            <div
              key={card.title}
              className={`${cardState(card.tags, highlightedTags)} system-card ${
                phase.id === "engineering" ? "md:grid md:grid-cols-[12rem_1fr] md:gap-5" : ""
              }`}
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {card.type}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-neutral-950">
                  {card.title}
                </h3>
              </div>
              <div className={phase.id === "engineering" ? "mt-3 md:mt-0" : ""}>
                <p className="text-[13px] leading-6 text-neutral-600">{card.text}</p>
              {card.tech ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-sky-900/8 bg-sky-50/35 px-3 py-1 text-[11px] text-neutral-600"
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
    </article>
  );
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
          This portfolio is self-hosted on my personal server, which is one of my
          side hobbies and a way I keep learning infrastructure by running real
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
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[30px] border border-white/75 bg-sky-50/80 shadow-[0_35px_120px_rgba(30,64,175,0.2)] backdrop-blur-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5 border-b border-neutral-950/8 px-5 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              {panel.eyebrow}
            </p>
            <h2
              id="inspection-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-neutral-950"
            >
              {panel.title}
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-neutral-500">
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
        <div className="space-y-5 p-5 sm:p-7">
          <p className="text-[15px] leading-7 text-neutral-700">{panel.summary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {panel.sections.map((section) => (
              <div
                key={section.label}
                className="rounded-2xl border border-sky-900/8 bg-sky-50/45 p-4"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {section.label}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-neutral-600">
                  {section.text}
                </p>
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
