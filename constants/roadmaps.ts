export interface RoadmapMilestone {
  title: string;
  description: string;
  resources: string[];
}

export interface Roadmap {
  slug: string;
  name: string;
  description: string;
  milestones: RoadmapMilestone[];
}

export const ROADMAPS: Roadmap[] = [
  {
    slug: "frontend",
    name: "Frontend Engineer",
    description: "From semantic HTML to production React architecture.",
    milestones: [
      { title: "Foundations", description: "HTML, CSS, and JavaScript fundamentals — the parts frameworks abstract away but interviews still ask about.", resources: ["MDN Web Docs", "JavaScript.info"] },
      { title: "Framework depth", description: "React (or Vue) internals: reconciliation, hooks, state management trade-offs.", resources: ["Official React docs", "Framework-specific RFCs"] },
      { title: "Performance & tooling", description: "Bundle analysis, code splitting, Core Web Vitals, build tooling.", resources: ["web.dev", "Bundlephobia"] },
      { title: "System design for frontend", description: "Component architecture, design systems, client-side data fetching strategies.", resources: ["Frontend system design guides"] },
    ],
  },
  {
    slug: "backend",
    name: "Backend Engineer",
    description: "APIs, databases, and the systems that keep them fast and correct.",
    milestones: [
      { title: "Language & fundamentals", description: "Pick a primary backend language and get fluent in its concurrency model.", resources: ["Language-specific official docs"] },
      { title: "Data modeling", description: "Relational vs. NoSQL trade-offs, indexing, normalization.", resources: ["Database internals references"] },
      { title: "API design", description: "REST/GraphQL design, versioning, auth patterns.", resources: ["API design guidelines"] },
      { title: "Scalability", description: "Caching layers, message queues, horizontal scaling strategies.", resources: ["System design primers"] },
    ],
  },
  {
    slug: "full-stack",
    name: "Full-Stack Engineer",
    description: "Frontend and backend depth, plus the seams where they meet.",
    milestones: [
      { title: "Core web fundamentals", description: "HTML/CSS/JS plus a backend language of choice.", resources: [] },
      { title: "Full request lifecycle", description: "From client render to API call to database query and back.", resources: [] },
      { title: "Auth & sessions", description: "Cookies, JWTs, OAuth flows end to end.", resources: [] },
      { title: "Deployment & DevOps basics", description: "CI/CD, containerization fundamentals, monitoring.", resources: [] },
    ],
  },
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    description: "Building products on top of foundation models, not training them from scratch.",
    milestones: [
      { title: "LLM fundamentals", description: "Tokenization, embeddings, context windows, prompting strategies.", resources: [] },
      { title: "RAG & tool use", description: "Retrieval-augmented generation, function/tool calling, agentic loops.", resources: [] },
      { title: "Evaluation", description: "Building evals, measuring hallucination and quality regressions.", resources: [] },
      { title: "Production concerns", description: "Latency, cost, prompt versioning, safety guardrails.", resources: [] },
    ],
  },
  {
    slug: "ml-engineer",
    name: "ML Engineer",
    description: "The math and infrastructure behind training and serving models.",
    milestones: [
      { title: "Math foundations", description: "Linear algebra, probability, calculus for gradient-based learning.", resources: [] },
      { title: "Classical ML", description: "Regression, trees, clustering, and when to reach for each.", resources: [] },
      { title: "Deep learning", description: "Neural network architectures, training dynamics, regularization.", resources: [] },
      { title: "MLOps", description: "Model serving, monitoring drift, retraining pipelines.", resources: [] },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    description: "Turning data into decisions, not just models into metrics.",
    milestones: [
      { title: "Statistics", description: "Hypothesis testing, experiment design, confidence intervals.", resources: [] },
      { title: "Data wrangling", description: "SQL fluency, data cleaning, feature engineering.", resources: [] },
      { title: "Modeling", description: "Applied statistical and ML modeling for business problems.", resources: [] },
      { title: "Communication", description: "Translating findings into decisions stakeholders act on.", resources: [] },
    ],
  },
  {
    slug: "android",
    name: "Android Engineer",
    description: "Native Android development from Kotlin fundamentals to production apps.",
    milestones: [
      { title: "Kotlin fundamentals", description: "Language basics, coroutines, null safety.", resources: [] },
      { title: "Android architecture", description: "MVVM, Jetpack components, lifecycle management.", resources: [] },
      { title: "UI with Compose", description: "Declarative UI, state hoisting, theming.", resources: [] },
      { title: "Performance & publishing", description: "Profiling, app size, Play Store release process.", resources: [] },
    ],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    description: "Thinking like an attacker to build like a defender.",
    milestones: [
      { title: "Networking fundamentals", description: "TCP/IP, DNS, common protocols and their attack surfaces.", resources: [] },
      { title: "Web security", description: "OWASP Top 10, common vulnerability classes and mitigations.", resources: [] },
      { title: "Offensive basics", description: "Reconnaissance, exploitation fundamentals, responsible disclosure.", resources: [] },
      { title: "Defensive operations", description: "SIEM, incident response, hardening practices.", resources: [] },
    ],
  },
  {
    slug: "devops",
    name: "DevOps Engineer",
    description: "The pipelines and infrastructure that ship code reliably.",
    milestones: [
      { title: "Linux & scripting", description: "Shell fundamentals, process management, automation basics.", resources: [] },
      { title: "CI/CD", description: "Build pipelines, testing gates, deployment strategies.", resources: [] },
      { title: "Infrastructure as code", description: "Provisioning and configuration management tooling.", resources: [] },
      { title: "Observability", description: "Logging, metrics, tracing, on-call practices.", resources: [] },
    ],
  },
  {
    slug: "cloud-engineer",
    name: "Cloud Engineer",
    description: "Designing systems that run reliably on someone else's computer.",
    milestones: [
      { title: "Cloud fundamentals", description: "Compute, storage, networking primitives on a major provider.", resources: [] },
      { title: "Architecture patterns", description: "High availability, disaster recovery, multi-region design.", resources: [] },
      { title: "Cost & security", description: "Cost optimization, IAM, encryption at rest and in transit.", resources: [] },
      { title: "Automation", description: "Infrastructure as code, auto-scaling, self-healing systems.", resources: [] },
    ],
  },
];
