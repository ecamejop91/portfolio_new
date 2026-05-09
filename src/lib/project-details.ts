export type ProjectSlug =
  | "sona"
  | "linux-automation-stack"
  | "portfolio-infrastructure"
  | "document-search";

export type ProjectGalleryItem = {
  title: string;
  caption: string;
  alt: string;
  src?: string;
};

export type ProjectToolGroup = {
  label: string;
  items: string[];
};

export type ProjectLinkSet = {
  github: string | null;
  demo: string | null;
  caseStudy: string | null;
  codeRequest?: boolean;
  demoRequest?: boolean;
};

export type ProjectDetail = {
  slug: ProjectSlug;
  title: string;
  subtitle: string;
  summary: string;
  type: string;
  role: string;
  timeline: string;
  status: string;
  statusTone: "active" | "winner" | "research";
  accent: string;
  tags: string[];
  impact: string[];
  sections: {
    overview: string[];
    problem: string[];
    solution: string[];
    whatIDid: string[];
    challenges: string[];
    results: string[];
    lessons: string[];
  };
  architecture: { label: string; detail: string }[];
  tools: ProjectToolGroup[];
  gallery: ProjectGalleryItem[];
  links: ProjectLinkSet;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "sona",
    title: "Sona AI Interview Platform",
    subtitle:
      "An AI-guided interview practice experience built to help students simulate realistic interviews and receive targeted feedback.",
    summary:
      "Competition-built product prototype focused on interview flow, role context, and AI-assisted coaching for students preparing for internships.",
    type: "AI Product / Hackathon Project",
    role: "Product flow, system design, prototyping",
    timeline: "Bank of America Code-A-Thon",
    status: "1st Place Prototype",
    statusTone: "winner",
    accent: "from-cyan-400/30 via-sky-400/10 to-transparent",
    tags: [
      "Next.js",
      "React",
      "Tailwind",
      "Node.js",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "AI Feedback",
      "Interview Prep",
      "Hackathon",
    ],
    impact: [
      "Built live AI interview platform",
      "Integrated resume and job-description workflow",
      "Designed AI-assisted feedback experience",
      "Delivered competition-ready prototype",
      "Won 1st place at BofA Code-A-Thon",
    ],
    sections: {
      overview: [
        "Sona is an AI-powered interview practice platform built to help students simulate interview environments and receive personalized feedback.",
        "The platform was created during a Bank of America Code-A-Thon and won 1st place among 12 teams.",
        "The project focused on product flow, AI-assisted feedback, resume and job-description inputs, and a realistic interview preparation experience.",
      ],
      problem: [
        "Students often struggle to practice interviews in realistic conditions before applying to internships or full-time roles.",
        "Generic practice questions are not enough because students need feedback connected to their resume, target role, and performance.",
      ],
      solution: [
        "We built an AI-powered interview practice platform where users can provide career context, complete a simulated interview, and receive feedback.",
        "The system was designed to help students prepare for interviews with a more personalized and interactive experience.",
      ],
      whatIDid: [
        "Helped design and build the core product flow.",
        "Worked on the interview preparation experience.",
        "Integrated resume and job-description context into the workflow.",
        "Contributed to system design and demo delivery.",
        "Helped prepare a competition-ready prototype.",
      ],
      challenges: [
        "Designing a realistic interview flow under time pressure.",
        "Making the experience useful for students quickly.",
        "Balancing AI features with a simple user interface.",
        "Preparing a working prototype for competition judging.",
      ],
      results: [
        "Delivered a working AI interview practice prototype.",
        "Won 1st place at a national Bank of America Code-A-Thon.",
        "Created a product concept with potential for student career preparation.",
        "Practiced building under time constraints with a team.",
      ],
      lessons: [
        "This project taught me how important product clarity is when building under time pressure. A technically interesting system still needs a clear user flow, a strong problem statement, and a demo that communicates value quickly.",
      ],
    },
    architecture: [
      { label: "User", detail: "Student enters role goals, resume context, and interview preferences." },
      { label: "Next.js App", detail: "Handles the product flow, UI states, and interview session experience." },
      { label: "API Layer", detail: "Coordinates prompts, session inputs, and feedback generation requests." },
      { label: "AI Services", detail: "Produces interview questions, response analysis, and coaching feedback." },
      { label: "Firebase", detail: "Supports auth, project data, and file storage for user context." },
    ],
    tools: [
      { label: "Frontend", items: ["Next.js", "React", "Tailwind"] },
      { label: "Backend", items: ["Next.js API routes", "Node.js"] },
      {
        label: "AI / Data",
        items: ["AI services", "Resume processing", "Job-description analysis", "Feedback generation"],
      },
      { label: "Database / Auth", items: ["Firebase Auth", "Firestore", "Firebase Storage"] },
    ],
    gallery: [
      {
        title: "Landing page",
        alt: "Placeholder for Sona landing page",
        caption: "Placeholder for the product landing page introducing the interview practice experience.",
      },
      {
        title: "Interview preparation room",
        alt: "Placeholder for the interview preparation room",
        caption: "Placeholder for the step where users attach resume context and target role details.",
      },
      {
        title: "AI interview interface",
        alt: "Placeholder for the AI interview interface",
        caption: "Placeholder for the live interview screen with question prompts and response capture.",
      },
      {
        title: "Feedback and report page",
        alt: "Placeholder for the feedback report page",
        caption: "Placeholder for the AI-generated interview summary and coaching feedback.",
      },
      {
        title: "Architecture diagram",
        alt: "Placeholder for the Sona architecture diagram",
        caption: "Placeholder for the app, API, AI, and Firebase system view.",
      },
      {
        title: "Competition demo screenshot",
        alt: "Placeholder for the competition demo screenshot",
        caption: "Placeholder for the version shown during hackathon judging.",
      },
    ],
    links: {
      github: null,
      demo: null,
      caseStudy: null,
      codeRequest: true,
      demoRequest: true,
    },
  },
  {
    slug: "linux-automation-stack",
    title: "Self-Hosted Linux Automation Stack",
    subtitle:
      "A private Ubuntu server running Dockerized services, automation scripts, scheduled jobs, storage workflows, and monitoring.",
    summary:
      "Infrastructure-heavy systems project centered on deployment, service integration, Linux administration, and automation around real workloads.",
    type: "Infrastructure / Systems Project",
    role: "Deployment, automation, troubleshooting",
    timeline: "Ongoing",
    status: "Active",
    statusTone: "active",
    accent: "from-emerald-400/25 via-cyan-400/10 to-transparent",
    tags: [
      "Linux",
      "Docker",
      "Docker Compose",
      "Bash",
      "Cron",
      "Networking",
      "Storage",
      "Automation",
      "Plex",
      "Sonarr",
      "Radarr",
      "qBittorrent",
    ],
    impact: [
      "Deployed Dockerized services on Ubuntu",
      "Automated Linux workflows with Bash and cron",
      "Configured storage mounts and permissions",
      "Integrated Plex, Sonarr, Radarr, and qBittorrent",
      "Troubleshot container, DNS, and service issues",
    ],
    sections: {
      overview: [
        "I built and manage a self-hosted Linux automation environment on a private Ubuntu server.",
        "The system runs multiple Dockerized services and custom scripts that automate media workflows, storage organization, scheduled jobs, and service monitoring.",
        "This project focuses on deployment, systems integration, Linux administration, and automation rather than building the underlying third-party applications from scratch.",
      ],
      problem: [
        "I wanted to learn how real services are deployed, connected, monitored, and maintained outside of classroom assignments.",
        "I also wanted to reduce repetitive file management tasks and create a reliable private server environment that I could customize with scripts and Linux automation.",
      ],
      solution: [
        "I deployed a Docker-based service stack on Ubuntu and connected media services, storage folders, automation scripts, scheduled jobs, and monitoring checks into one managed environment.",
        "I customized the setup with Bash scripts, cron jobs, Docker networking, and persistent volumes to automate repetitive workflows.",
      ],
      whatIDid: [
        "Deployed and configured Dockerized services.",
        "Connected services through Docker networking.",
        "Configured persistent storage volumes.",
        "Managed Linux permissions and mounted directories.",
        "Created Bash scripts for workflow automation.",
        "Scheduled recurring jobs with cron.",
        "Monitored logs and resolved service failures.",
        "Tuned the setup around my own workflow needs.",
      ],
      challenges: [
        "Handling container networking between services.",
        "Managing Linux file permissions across mounted volumes.",
        "Debugging storage paths inside and outside containers.",
        "Automating workflows around filenames and completed downloads.",
        "Keeping services reliable after restarts.",
        "Reading logs to diagnose failures.",
      ],
      results: [
        "Created a working private server environment.",
        "Reduced repetitive file-management tasks.",
        "Built reusable Linux automation patterns.",
        "Improved hands-on understanding of Docker, Linux, networking, and storage.",
        "Gained practical operational experience maintaining services over time.",
      ],
      lessons: [
        "This project taught me that running software is different from only writing software. Deployment, storage, logs, networking, permissions, and automation all affect whether a system actually works reliably. It helped me think more like an operator and systems engineer.",
      ],
    },
    architecture: [
      { label: "User / Browser", detail: "Accesses the stack through the local network or a domain." },
      { label: "Local Network / Domain", detail: "Routes traffic into the private Ubuntu environment." },
      { label: "Ubuntu Server", detail: "Hosts containers, storage mounts, scripts, and service logs." },
      { label: "Docker Compose", detail: "Orchestrates container networking, volumes, and lifecycle behavior." },
      { label: "Service Layer", detail: "Runs Plex, Sonarr, Radarr, qBittorrent, and related utilities." },
      { label: "Storage + Automation", detail: "Mounted storage, Bash scripts, cron jobs, and operational logs." },
    ],
    tools: [
      { label: "Operating System", items: ["Ubuntu Linux"] },
      { label: "Containerization", items: ["Docker", "Docker Compose"] },
      { label: "Automation", items: ["Bash", "Cron", "Shell scripts"] },
      { label: "Services", items: ["Plex", "Sonarr", "Radarr", "qBittorrent"] },
      {
        label: "Infrastructure",
        items: ["Networking", "Storage mounts", "Linux permissions", "Service logs"],
      },
    ],
    gallery: [
      {
        title: "Docker container dashboard",
        alt: "Placeholder for Docker container dashboard",
        caption: "Placeholder for a dashboard showing the active service stack and container health.",
      },
      {
        title: "Service network diagram",
        alt: "Placeholder for service network diagram",
        caption: "Placeholder for the relationships between containers, ports, and internal traffic.",
      },
      {
        title: "Storage folder structure",
        alt: "Placeholder for storage folder structure",
        caption: "Placeholder for mounted volumes, organized directories, and media workflow paths.",
      },
      {
        title: "Terminal automation output",
        alt: "Placeholder for terminal automation output",
        caption: "Placeholder for script output used to automate file handling and operational tasks.",
      },
      {
        title: "Cron job configuration",
        alt: "Placeholder for cron job configuration",
        caption: "Placeholder for recurring job definitions and schedule-driven automation.",
      },
      {
        title: "Monitoring or health check view",
        alt: "Placeholder for monitoring or health check view",
        caption: "Placeholder for logs, checks, or a monitoring surface used to verify service health.",
      },
    ],
    links: {
      github: null,
      demo: null,
      caseStudy: null,
      codeRequest: true,
      demoRequest: true,
    },
  },
  {
    slug: "portfolio-infrastructure",
    title: "Portfolio Infrastructure",
    subtitle:
      "A self-hosted Next.js portfolio deployed on a private Ubuntu server with Docker, Caddy, health checks, and live status reporting.",
    summary:
      "Deployment-focused project where the portfolio itself doubles as proof of infrastructure, routing, monitoring, and cost-aware engineering.",
    type: "Deployment / Infrastructure Project",
    role: "Frontend, deployment, monitoring",
    timeline: "Ongoing",
    status: "Active",
    statusTone: "active",
    accent: "from-sky-400/25 via-blue-400/10 to-transparent",
    tags: [
      "Next.js",
      "React",
      "Tailwind",
      "Docker",
      "Ubuntu Server",
      "Caddy",
      "Health Checks",
      "Uptime",
      "Cloudflare Tunnel",
      "Self-Hosting",
    ],
    impact: [
      "Self-hosted production portfolio",
      "Deployed Dockerized Next.js app",
      "Added health check endpoint",
      "Tracked uptime and container runtime",
      "Estimated hosting savings live",
    ],
    sections: {
      overview: [
        "This portfolio is self-hosted from a private Ubuntu server that I manage.",
        "The site runs as a Dockerized Next.js application, is served through Caddy, and includes health checks, uptime tracking, and estimated hosting savings compared to a similar cloud VPS.",
        "This project demonstrates deployment, infrastructure, monitoring, and cost-aware engineering.",
      ],
      problem: [
        "Most portfolios are hosted through managed services, which hides the infrastructure behind the site.",
        "I wanted my portfolio itself to demonstrate deployment ability, Linux server management, containerization, monitoring, and cost-aware engineering.",
      ],
      solution: [
        "I deployed my portfolio as a containerized Next.js application on a private Ubuntu server.",
        "Caddy handles routing and reverse proxy behavior, Docker isolates the app runtime, and the site includes a health endpoint for monitoring service status.",
      ],
      whatIDid: [
        "Built the portfolio using Next.js and Tailwind.",
        "Containerized the application with Docker.",
        "Deployed the app on a private Ubuntu server.",
        "Configured routing with Caddy.",
        "Added health checks and uptime/status display.",
        "Designed a live estimated hosting savings calculation.",
      ],
      challenges: [
        "Avoiding double scrollbars and layout issues.",
        "Handling Docker deployment and port mapping.",
        "Routing traffic through Caddy and domain configuration.",
        "Creating a clean way to show uptime, health, and savings.",
        "Keeping infrastructure claims accurate and not exaggerated.",
      ],
      results: [
        "Deployed a self-hosted production portfolio.",
        "Added public health and status monitoring.",
        "Showcased Docker, Linux, routing, and deployment skills.",
        "Added estimated hosting savings compared to a cloud VPS.",
        "Turned the portfolio itself into a technical project.",
      ],
      lessons: [
        "This project taught me how to treat a personal website like a real deployed service. I learned to think about uptime, health checks, routing, containers, monitoring, and cost, not just the visual design of the site.",
      ],
    },
    architecture: [
      { label: "Visitor", detail: "Loads the site and navigates through the public portfolio pages." },
      { label: "Domain / Tunnel", detail: "Traffic is routed through domain configuration and a reverse-proxy path." },
      { label: "Caddy Reverse Proxy", detail: "Terminates requests and forwards them to the app container." },
      { label: "Docker Container", detail: "Runs the Next.js portfolio in an isolated application runtime." },
      { label: "Next.js Portfolio App", detail: "Serves the UI and runtime endpoints used by the status card." },
      { label: "Health + Metrics", detail: "Tracks health status, runtime observations, and savings calculations." },
    ],
    tools: [
      { label: "Frontend", items: ["Next.js", "React", "Tailwind"] },
      { label: "Deployment", items: ["Docker", "Ubuntu Server", "Caddy"] },
      {
        label: "Monitoring",
        items: ["Health endpoint", "Docker healthcheck", "External uptime checks"],
      },
      { label: "Networking", items: ["Domain routing", "Cloudflare Tunnel", "Reverse proxy"] },
    ],
    gallery: [
      {
        title: "Portfolio homepage",
        alt: "Placeholder for the portfolio homepage",
        caption: "Placeholder for the deployed landing page and recruiter-facing portfolio entry point.",
      },
      {
        title: "Docker container status",
        alt: "Placeholder for Docker container status",
        caption: "Placeholder for the running container and health state on the Ubuntu server.",
      },
      {
        title: "Health endpoint response",
        alt: "Placeholder for the health endpoint response",
        caption: "Placeholder for the JSON response returned by the public health check route.",
      },
      {
        title: "Caddy routing diagram",
        alt: "Placeholder for the Caddy routing diagram",
        caption: "Placeholder for the request path through the reverse proxy and container.",
      },
      {
        title: "Uptime monitor view",
        alt: "Placeholder for the uptime monitor view",
        caption: "Placeholder for the monitoring view used to distinguish public availability from runtime data.",
      },
      {
        title: "Hosting savings card",
        alt: "Placeholder for the hosting savings card",
        caption: "Placeholder for the live cost-awareness widget shown on the site.",
      },
    ],
    links: {
      github: null,
      demo: "/",
      caseStudy: null,
      codeRequest: true,
      demoRequest: false,
    },
  },
  {
    slug: "document-search",
    title: "Local Document Search System",
    subtitle:
      "A privacy-focused workflow for extracting, tagging, and ranking PDF content locally without relying on cloud-hosted search services.",
    summary:
      "Information-retrieval project centered on PDF extraction, search relevance, and local-first processing across a growing private document collection.",
    type: "Search / Data Project",
    role: "Data processing, ranking logic, experimentation",
    timeline: "Current Build",
    status: "Research in Progress",
    statusTone: "research",
    accent: "from-violet-400/20 via-cyan-400/10 to-transparent",
    tags: [
      "Python",
      "PyMuPDF",
      "Pandas",
      "Regex",
      "TF-IDF",
      "Cosine Similarity",
      "Tagging",
      "PDF Search",
      "Local Processing",
      "Privacy",
    ],
    impact: [
      "Processed 200+ PDF documents",
      "Extracted searchable text from files",
      "Built tag-based document classification",
      "Used vector ranking for search relevance",
      "Prioritized local privacy-focused processing",
    ],
    sections: {
      overview: [
        "This project explores local document search across a collection of PDFs using text extraction, tokenization, tagging, and vector-based ranking.",
        "The goal was to create a private, searchable document system without relying on cloud-hosted AI services.",
        "The project focused on information retrieval, privacy, and practical search performance.",
      ],
      problem: [
        "Household and business PDFs can become difficult to search when files are scattered across folders.",
        "I wanted a local system that could extract text, tag documents, and return useful search results while keeping the data private.",
      ],
      solution: [
        "I created a local document-processing workflow that extracts text from PDFs, cleans and tokenizes the content, assigns tags, and ranks documents based on search relevance.",
        "The project emphasizes privacy, local processing, and practical document retrieval.",
      ],
      whatIDid: [
        "Processed a local collection of PDF documents.",
        "Extracted and cleaned text from files.",
        "Designed a tag classification system.",
        "Implemented search ranking logic.",
        "Tested results against real document examples.",
        "Focused on privacy-preserving local processing.",
      ],
      challenges: [
        "Extracting clean text from inconsistent PDFs.",
        "Reducing noise from document formatting.",
        "Choosing useful tags.",
        "Ranking search results accurately.",
        "Keeping the system local and privacy-friendly.",
      ],
      results: [
        "Built a working local PDF search workflow.",
        "Processed hundreds of documents.",
        "Created searchable tags and ranked results.",
        "Demonstrated practical information retrieval concepts.",
        "Preserved privacy by keeping processing local.",
      ],
      lessons: [
        "This project taught me how much search quality depends on preprocessing, tokenization, and ranking decisions. It also helped me understand why privacy, speed, and relevance are important tradeoffs in document search systems.",
      ],
    },
    architecture: [
      { label: "PDF Folder", detail: "A local document set acts as the private source corpus." },
      { label: "Text Extraction", detail: "PDF contents are parsed into machine-readable text." },
      { label: "Cleaning / Tokenization", detail: "Text is normalized and prepared for search indexing." },
      { label: "Tagging / Vectorization", detail: "Documents receive labels and searchable numeric representations." },
      { label: "Search Query", detail: "User terms are processed using the same normalization path." },
      { label: "Ranked Results", detail: "Relevant documents are returned with scores and previews." },
    ],
    tools: [
      { label: "Language", items: ["Python"] },
      { label: "Libraries", items: ["PyMuPDF", "Pandas", "Regex"] },
      { label: "Search", items: ["TF-IDF or vector ranking", "Cosine similarity", "Tag classification"] },
      { label: "Environment", items: ["Jupyter Notebook", "Local file system"] },
    ],
    gallery: [
      {
        title: "Search interface",
        alt: "Placeholder for the search interface",
        caption: "Placeholder for the query UI used to search the local PDF collection.",
      },
      {
        title: "Extracted tag output",
        alt: "Placeholder for the extracted tag output",
        caption: "Placeholder for document tags generated during preprocessing.",
      },
      {
        title: "PDF result preview",
        alt: "Placeholder for the PDF result preview",
        caption: "Placeholder for the snippet and preview shown for a matched document.",
      },
      {
        title: "Search ranking results",
        alt: "Placeholder for the ranking results",
        caption: "Placeholder for search scores or ordering behavior across returned documents.",
      },
      {
        title: "Architecture diagram",
        alt: "Placeholder for the document search architecture",
        caption: "Placeholder for the extraction, tagging, vectorization, and ranking flow.",
      },
      {
        title: "Performance test output",
        alt: "Placeholder for the performance test output",
        caption: "Placeholder for timing, throughput, or relevance evaluation output.",
      },
    ],
    links: {
      github: null,
      demo: null,
      caseStudy: null,
      codeRequest: true,
      demoRequest: true,
    },
  },
];

export const projectDetailBySlug = Object.fromEntries(
  projectDetails.map((project) => [project.slug, project]),
) as Record<ProjectSlug, ProjectDetail>;

export function getProjectBySlug(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
