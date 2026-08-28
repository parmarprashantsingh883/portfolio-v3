/* Knowledge base for the portfolio AI assistant.
   Answers support a markdown-lite subset rendered by ChatWidget:
   **bold**, [text](url), and \n line breaks. */

export type KBEntry = {
  id: string
  /** single tokens that vote for this entry (1 pt each, counted once) */
  keys: string[]
  /** exact substrings that strongly vote (5 pts each) */
  phrases?: string[]
  answer: string
  /** optional deep-dive shown when the visitor asks for "more" */
  more?: string
  /** suggested follow-up chips */
  chips?: string[]
}

export const DEFAULT_CHIPS = ['What does he do?', 'Show me his projects', 'His AI workflow', 'How to contact him?']

export const GREETING =
  "Hi! I'm **Prashant's AI assistant** — I know his work, projects and skills inside out. Ask me anything, or tap a suggestion below. 👇"

/* canonical token ← variants */
export const SYNONYMS: Record<string, string> = {
  job: 'work', role: 'work', company: 'work', employer: 'work', intern: 'work', internship: 'work',
  msbc: 'dwerp', erp: 'dwerp',
  built: 'projects', build: 'projects', portfolio: 'projects', made: 'projects', apps: 'projects', project: 'projects',
  claude: 'ai', copilot: 'ai', chatgpt: 'ai', llm: 'ai', agent: 'ai', agents: 'ai', gpt: 'ai',
  email: 'contact', mail: 'contact', phone: 'contact', call: 'contact', reach: 'contact', connect: 'contact',
  number: 'contact', mobile: 'contact', telephone: 'contact', cell: 'contact', digits: 'contact', dm: 'contact',
  cv: 'resume', bio: 'resume', biodata: 'resume',
  stack: 'skills', tech: 'skills', technologies: 'skills', technology: 'skills', skill: 'skills', tools: 'skills',
  college: 'education', university: 'education', degree: 'education', study: 'education', studied: 'education',
  cgpa: 'education', bca: 'education', qualification: 'education',
  hostel: 'quarters', hostelhub: 'quarters', saas: 'quarters', pg: 'quarters',
  asset: 'signet', signet: 'signet',
  diff: 'adc', 'ai-diff-check': 'adc', aidiffcheck: 'adc', npm: 'adc', cli: 'adc', package: 'adc',
  clover: 'clovers', ecommerce: 'clovers', grocery: 'clovers', store: 'clovers', shop: 'clovers',
  based: 'location', city: 'location', ahmedabad: 'location', relocate: 'location', relocation: 'location', remote: 'location',
  hire: 'availability', hiring: 'availability', available: 'availability', join: 'availability',
  opening: 'availability', opportunity: 'availability', freelance: 'availability', notice: 'availability', salary: 'availability',
  git: 'github', repo: 'github', repos: 'github', code: 'github',
  react: 'skills', typescript: 'skills', javascript: 'skills', frontend: 'skills',
  testing: 'skills', vitest: 'skills', playwright: 'skills',
  website: 'site', chatbot: 'site', bot: 'site',
}

export const KB: KBEntry[] = [
  {
    id: 'about',
    keys: ['who', 'about', 'prashant', 'introduce', 'introduction', 'yourself', 'himself', 'summary'],
    phrases: ['tell me about', 'who is'],
    answer:
      "**Prashant Parmar** is a frontend engineer from Ahmedabad, India. By day he ships production code on **DWERP**, a live multi-tenant enterprise ERP (React 19 + TypeScript strict). Beyond work he finishes what he starts: **Quarters**, a deployed multi-tenant SaaS, and **ai-diff-check**, an npm-published CLI — both built solo.\nHis edge: **AI-powered development** with real engineering discipline.",
    chips: ['What does he do at MSBC?', 'Show me his projects', 'His AI workflow'],
  },
  {
    id: 'work',
    keys: ['work', 'dwerp', 'experience', 'production', 'professional', 'live', 'deployed', 'client'],
    phrases: ['what does he do', 'current job', 'where does he work', 'live project', 'real project', 'real world', 'production experience'],
    answer:
      'Yes — and this is the key thing: Prashant works on a **LIVE production system**, not a training project. **DWERP** is an enterprise multi-tenant SaaS ERP that real glass-manufacturing businesses run their operations on — his code ships to real users.\nAt **MSBC Group** (SDE, Mar 2026 – present) he owns bugs **end-to-end** on it: reproduce → root-cause across the component tree, TanStack Query data layer and REST contracts → fix → gate with types and tests. He built the **RBAC access-control UI** across all 5 ERP modules and hardened typed forms (RHF + Zod) for 4 regions (IN/UK/US/AUS).',
    more:
      'More on the live-production reality of DWERP: mistakes there have real consequences, so every change passes strict `tsc`, production builds and Vitest/Playwright **before** it ships. He also runs **spec-vs-implementation gap analysis** against PRD/BRD docs and reviews pull requests. Stack: React 19, TypeScript strict, Vite, Tailwind, TanStack Query v5 + Table, Zustand, RHF + Zod.',
    chips: ['Tell me more', 'His tech stack', 'His AI workflow'],
  },
  {
    id: 'skills',
    keys: ['skills'],
    phrases: ['tech stack', 'what can he do', 'good at'],
    answer:
      "**Languages:** TypeScript, JavaScript (ES6+), HTML5, CSS3\n**Frontend:** React 19, React Router, TanStack Query v5 & Table, React Hook Form + Zod, Zustand, Redux\n**Styling:** Tailwind CSS, shadcn/ui (Radix), responsive & accessible UI\n**Backend & data:** Node.js, Express, MongoDB, REST APIs, JWT, multi-tenancy\n**Testing & tooling:** Vite, Vitest, Playwright, Git, Azure DevOps, Docker, Vercel/Render\nAnd the meta-skill: **directing AI coding agents** through all of the above.",
    chips: ['His AI workflow', 'Projects using this stack', 'Contact him'],
  },
  {
    id: 'ai',
    keys: ['ai'],
    phrases: ['ai workflow', 'ai powered', 'ai-powered', 'how does he use ai'],
    answer:
      "Prashant is an **early, disciplined adopter of AI-powered development**. He directs AI coding agents (**Claude Code**, GitHub Copilot) like a tech lead across the full bug-to-PR cycle — reproducing issues, navigating large codebases, drafting fixes and tests.\nThe discipline part: **nothing ships unverified**. Strict `tsc`, production builds and Vitest/Playwright gate every AI-assisted change.\nHe even built his own AI tooling — **ai-diff-check**, an npm CLI that reviews AI-written code (`npx ai-diff-check`).",
    more:
      'His rule of thumb: **AI is a fast pair, not autopilot.** The agent does the heavy lifting; verification gates keep it honest. That workflow turns QA reports into reviewed, test-passing pull requests on real production code — and it is exactly the skill teams adopting AI need.',
    chips: ['Tell me more', 'What is ai-diff-check?', 'His projects'],
  },
  {
    id: 'projects',
    keys: ['projects', 'shipped', 'showcase'],
    phrases: ['what has he built', 'side projects', 'other projects'],
    answer:
      "First and foremost: **DWERP** — his **live production project** at MSBC Group. An enterprise multi-tenant ERP that real businesses run their operations on, built with React 19 + TypeScript strict. That's professional, in-production experience, not a portfolio piece.\nThen the solo builds:\n1. **Quarters** — multi-tenant hostel SaaS, **deployed & live** (React, Node/Express, MongoDB Atlas)\n2. **Signet** — enterprise-style IT asset platform with its own design system\n3. **ai-diff-check** — **npm-published** CLI that reviews AI-written code (10+ releases)\n4. **Clovers** — grocery e-commerce storefront\nAsk about any of them!",
    chips: ['His live project DWERP', 'Tell me about Quarters', 'What is ai-diff-check?'],
  },
  {
    id: 'quarters',
    keys: ['quarters'],
    answer:
      "**Quarters** is a complete SaaS Prashant designed, built and deployed **solo** — frontend, API and database.\n→ True **org-scoped multi-tenancy** on every model (tenant isolation)\n→ Billing plans with trial limits + full **payment lifecycle** with PDF receipts\n→ Leads pipeline, dark mode, quick-view drawers\n**Stack:** React · Node/Express · MongoDB Atlas · JWT — live on Vercel + Render + Atlas.",
    chips: ['What is Signet?', 'His other projects', 'Contact him'],
  },
  {
    id: 'signet',
    keys: ['signet'],
    answer:
      "**Signet** is an enterprise-style **IT asset-management platform** with its own design system — asset registry with detail drawers, live dashboard analytics, a 3-step **handover wizard with signed-acknowledgement PDF**, and an audit trail.\nIt is **RBAC-gated** on a fully typed mock-API architecture.\n**Stack:** React 18 · TypeScript strict · TanStack Query v5 · Tailwind · Zod.",
    chips: ['Tell me about Quarters', 'What is ai-diff-check?', 'His tech stack'],
  },
  {
    id: 'adc',
    keys: ['adc'],
    answer:
      "**ai-diff-check** is Prashant's answer to shipping AI-generated code responsibly — a CLI that reviews AI-written diffs *before* they're committed.\n→ **Published on npm** — runs with a single `npx ai-diff-check` (10+ releases)\n→ Deterministic **AST analysis** — no cloud, no LLM required\n→ Flags duplicated logic, dead exports, stubbed error handling and untested changes\n**Stack:** TypeScript · Node.js · Vitest.",
    chips: ['His AI workflow', 'Other projects', 'GitHub'],
  },
  {
    id: 'clovers',
    keys: ['clovers'],
    answer:
      '**Clovers** is a grocery e-commerce storefront built against a JSON REST API — category filters, dynamic product pages, and **cart & wishlist** flows, composed from reusable responsive components.\n**Stack:** React · REST API.',
    chips: ['Tell me about Quarters', 'His tech stack'],
  },
  {
    id: 'contact',
    keys: ['contact', 'linkedin', 'whatsapp', 'number', 'mobile', 'telephone'],
    phrases: ['get in touch', 'talk to him'],
    answer:
      '📧 **Email:** [parmarprashantsingh883@gmail.com](mailto:parmarprashantsingh883@gmail.com)\n📱 **Phone:** [+91-9574028096](tel:+919574028096)\n🐙 **GitHub:** [github.com/parmarprashantsingh883](https://github.com/parmarprashantsingh883)\n📄 **Resume:** [download the PDF](/resume.pdf)\nHe responds fast — reach out!',
    chips: ['Is he available for hire?', 'Download resume'],
  },
  {
    id: 'resume',
    keys: ['resume', 'download'],
    answer:
      'Here you go — **[open his resume (PDF)](/resume.pdf)**. It covers his DWERP production experience, AI-powered development workflow, projects and education on two tidy pages.',
    chips: ['Contact him', 'His experience'],
  },
  {
    id: 'education',
    keys: ['education'],
    answer:
      '🎓 **Bachelor of Computer Application** — Silver Oak University (2023–2025), **CGPA 8.6**\n📚 **MERN Stack Development Program** — Tops Technologies, Ahmedabad (2025)\n**Languages:** English (proficient), Hindi (native), Gujarati (basic).',
    chips: ['His experience', 'His skills'],
  },
  {
    id: 'location',
    keys: ['location', 'india', 'timezone'],
    phrases: ['where is he'],
    answer:
      'Prashant is based in **Ahmedabad, India** (IST, UTC+5:30). He currently works on-site at MSBC Group and is comfortable with **remote or hybrid** setups — modern async workflows are literally his thing.',
    chips: ['Is he available for hire?', 'Contact him'],
  },
  {
    id: 'availability',
    keys: ['availability', 'interview'],
    phrases: ['open to work', 'looking for'],
    answer:
      "He's **open to frontend engineering opportunities** — especially React/TypeScript roles where AI-powered development is valued. The fastest way to talk: email **[parmarprashantsingh883@gmail.com](mailto:parmarprashantsingh883@gmail.com)** or call **+91-9574028096**.\n(For compensation questions — that's a conversation for him, not me 😄)",
    chips: ['Contact him', 'Download resume', 'Why hire him?'],
  },
  {
    id: 'whyhire',
    keys: ['why', 'strengths', 'special', 'different', 'unique', 'standout'],
    phrases: ['why hire', 'why should'],
    answer:
      'Three reasons:\n1. **Real production experience** — he owns bug-to-release on a live enterprise ERP, not tutorial apps\n2. **AI-native, verification-first** — he ships with AI agents at tech-lead level speed, gated by types and tests\n3. **He finishes things** — a deployed SaaS, an npm package, a design system. Shipped > started.\nJunior title, senior habits.',
    chips: ['Contact him', 'His projects'],
  },
  {
    id: 'github',
    keys: ['github'],
    answer:
      'His GitHub is **[github.com/parmarprashantsingh883](https://github.com/parmarprashantsingh883)** — portfolio source, Quarters, and more. ai-diff-check is on npm too: `npx ai-diff-check`.',
    chips: ['His projects', 'Contact him'],
  },
  {
    id: 'site',
    keys: ['site'],
    phrases: ['this website', 'this site', 'this portfolio', 'are you real', 'how do you work'],
    answer:
      "Meta question — love it. This site is **React 19 + TypeScript + Vite**, hand-written CSS (no framework), with dark mode and scroll-choreographed animation.\nI'm the AI assistant: I run on a **local knowledge engine** (instant, free, no cookies), and when deployed with an API key I upgrade to **Claude** for free-form answers. My whole existence is a demo of Prashant's AI-powered development. 🤖",
    chips: ['His AI workflow', 'His projects'],
  },
]

/* ---------- reasoning-layer data ---------- */

/** one-line summaries used when composing multi-topic / comparison answers */
export const BRIEFS: Record<string, string> = {
  work: '**DWERP @ MSBC** — a LIVE enterprise ERP in production (real businesses run on it); he owns bugs end-to-end (React 19 + TS strict) and built the RBAC UI across 5 modules',
  ai: '**AI workflow** — directs Claude Code/Copilot through the bug-to-PR cycle, gated by tsc + Vitest/Playwright',
  quarters: '**Quarters** — multi-tenant hostel SaaS designed, built & deployed solo (React, Node/Express, MongoDB Atlas): tenant isolation, billing, PDF receipts',
  signet: '**Signet** — enterprise-style IT asset platform (React 18 + TS strict): dashboard analytics, handover wizard with signed PDF, RBAC-gated',
  adc: '**ai-diff-check** — npm-published CLI (`npx ai-diff-check`, 10+ releases) that reviews AI-written diffs via deterministic AST analysis',
  clovers: '**Clovers** — grocery e-commerce storefront (React + REST) with cart & wishlist flows',
}

/** verdict lines for project comparisons */
export const COMPARE_VERDICTS: Record<string, string> = {
  'quarters+signet':
    'Different muscles: **Quarters** proves he can ship a whole product to production solo; **Signet** proves design-system and enterprise-architecture thinking. Together they cover the full range.',
  'adc+quarters':
    'One is a product, one is a tool — **Quarters** shows product ownership, **ai-diff-check** shows engineering judgment about AI code. Both are shipped, not tutorials.',
  default: 'Both are shipped and real — not tutorial projects. Ask him which one was harder to build 😉',
}

type SkillFact = { known: boolean; text: string }

/** alias → canonical skill id (checked against RAW tokens, before synonym collapse) */
export const SKILL_LOOKUP: Record<string, string> = {
  react: 'react', reactjs: 'react',
  typescript: 'typescript', ts: 'typescript',
  javascript: 'javascript', js: 'javascript', es6: 'javascript',
  tailwind: 'tailwind', tailwindcss: 'tailwind', css: 'css', html: 'css', sass: 'css', accessibility: 'css', a11y: 'css',
  node: 'node', nodejs: 'node', express: 'node', backend: 'node',
  mongo: 'mongodb', mongodb: 'mongodb', atlas: 'mongodb', database: 'mongodb', sql: 'mongodb',
  rest: 'rest', api: 'rest', apis: 'rest', axios: 'rest',
  jwt: 'auth', auth: 'auth', authentication: 'auth', oauth: 'auth',
  tanstack: 'tanstack', query: 'tanstack',
  zod: 'forms', form: 'forms', forms: 'forms', validation: 'forms',
  zustand: 'zustand', redux: 'redux',
  vite: 'vite', webpack: 'vite',
  test: 'testing', tests: 'testing', testing: 'testing', vitest: 'testing', playwright: 'testing', jest: 'testing', tdd: 'testing',
  git: 'git', azure: 'git', devops: 'git',
  vercel: 'deploy', render: 'deploy', deploy: 'deploy', deployment: 'deploy', hosting: 'deploy', cicd: 'deploy',
  multitenancy: 'tenancy', tenant: 'tenancy', tenancy: 'tenancy',
  rbac: 'rbac', permissions: 'rbac', roles: 'rbac',
  claude: 'aidev', copilot: 'aidev', chatgpt: 'aidev', prompt: 'aidev', prompting: 'aidev',
  agentic: 'aidev', agents: 'aidev', agent: 'aidev', mcp: 'aidev', llm: 'aidev', llms: 'aidev',
  genai: 'aidev', cursor: 'aidev', aiassisted: 'aidev',
  // honest gaps
  next: 'nextjs', nextjs: 'nextjs',
  angular: 'angular', vue: 'vue', svelte: 'svelte',
  python: 'python', django: 'python', flask: 'python',
  java: 'java', spring: 'java', golang: 'golang', go: 'golang', php: 'php', laravel: 'php', ruby: 'php', rails: 'php',
  aws: 'aws', gcp: 'aws', cloud: 'aws', kubernetes: 'docker', docker: 'docker', k8s: 'docker',
  graphql: 'graphql', apollo: 'graphql',
  native: 'reactnative', flutter: 'reactnative', android: 'reactnative', ios: 'reactnative', mobile: 'reactnative',
}

export const SKILL_FACTS: Record<string, SkillFact> = {
  react: { known: true, text: 'React is his daily driver — **React 19 in production** on DWERP, React 18 on Signet, React on Quarters and Clovers.' },
  typescript: { known: true, text: '**TypeScript strict** is his default, not an add-on — DWERP and Signet are fully typed, with form types inferred from Zod schemas.' },
  javascript: { known: true, text: 'Solid ES6+ JavaScript — the base layer under all his React and Node work.' },
  tailwind: { known: true, text: 'Yes — **Tailwind CSS** on DWERP and Signet, plus hand-written CSS design systems (this site is one).' },
  css: { known: true, text: 'Strong CSS/HTML fundamentals — hand-written design systems (this site!), responsive layouts, WCAG-aware accessibility.' },
  node: { known: true, text: 'Yes — Quarters\' entire API is his: **Node.js + Express + MongoDB Atlas + JWT**, deployed on Render and serving real users.' },
  mongodb: { known: true, text: 'Yes — Quarters runs on **MongoDB Atlas** with org-scoped multi-tenant models on every collection.' },
  rest: { known: true, text: 'REST is everywhere in his work — consuming DWERP\'s enterprise contracts, and designing Quarters\' own API.' },
  auth: { known: true, text: 'Yes — **JWT auth** in Quarters, and **RBAC-gated UIs** on both DWERP (5 modules) and Signet.' },
  tanstack: { known: true, text: '**TanStack Query v5** powers the data layers of DWERP and Signet (plus TanStack Table for grids).' },
  forms: { known: true, text: '**React Hook Form + Zod** — typed, backend-contract-aligned forms on DWERP; it eliminated a recurring class of HTTP 400 bugs.' },
  zustand: { known: true, text: 'Yes — Zustand handles client state on DWERP and Signet.' },
  redux: { known: true, text: 'He knows Redux, though his modern picks are Zustand + TanStack Query — lighter and easier to reason about.' },
  vite: { known: true, text: 'Everything he ships builds on **Vite** — including this site.' },
  testing: { known: true, text: 'Yes — **Vitest + Playwright** gate every change he ships; he browser-verifies features end-to-end before calling them done.' },
  git: { known: true, text: 'Git daily — PRs through **Azure DevOps** at work, GitHub for open source.' },
  deploy: { known: true, text: 'He deploys his own products: **Vercel** (frontends), **Render** (APIs), **MongoDB Atlas** (data).' },
  tenancy: { known: true, text: 'Built it twice: DWERP is a multi-tenant enterprise ERP, and Quarters has **org-scoped isolation on every model**.' },
  rbac: { known: true, text: 'Yes — he built the **RBAC access-management UI** across all 5 DWERP modules; Signet is RBAC-gated too.' },
  aidev: { known: true, text: '**AI-Assisted Development is his headline skill.** He directs **Claude Code & GitHub Copilot** like a tech lead — custom agents & subagents, prompt/context engineering, MCP integrations — on live production work, with every change gated by `tsc` + Vitest/Playwright. He even built **ai-diff-check** (npm) to review AI-written code.' },
  // honest gaps — no pretending
  nextjs: { known: false, text: '**Next.js isn\'t in his shipped stack yet** — his depth is React 19 SPAs on Vite. The fundamentals (routing, data fetching, rendering trade-offs) transfer fast, and he picks up new stacks quickly with his AI-assisted workflow.' },
  angular: { known: false, text: 'Angular isn\'t his stack — he\'s deep in **React**. Component architecture transfers, but React is where his receipts are.' },
  vue: { known: false, text: 'Vue isn\'t his stack — he\'s deep in **React**. The reactive-UI concepts transfer, but React is where his receipts are.' },
  svelte: { known: false, text: 'No Svelte projects yet — his depth is **React**. He\'d ramp quickly, but React is where the shipped work is.' },
  python: { known: false, text: 'Python is **basic-level** for him — his production languages are TypeScript and JavaScript, front to back.' },
  java: { known: false, text: 'Java isn\'t his toolkit — his backend work is **Node.js/Express in TypeScript** (Quarters\' API is fully his).' },
  golang: { known: false, text: 'No Go yet — his backend experience is **Node.js/Express**, shipped and deployed in Quarters.' },
  php: { known: false, text: 'Not a PHP/Ruby person — his backend lane is **Node.js/Express with MongoDB**, deployed for real in Quarters.' },
  aws: { known: false, text: 'His deploys run on **Vercel + Render + MongoDB Atlas** rather than raw AWS — same concepts (envs, builds, scaling), friendlier tooling.' },
  docker: { known: true, text: 'Yes — he uses **Docker** for dev environments (e.g. containerized Postgres clones to test against production-parity data) alongside his Vercel/Render deploy pipelines.' },
  graphql: { known: false, text: 'His API work is **REST-first** (DWERP contracts, Quarters API) — no GraphQL project shipped yet.' },
  reactnative: { known: false, text: 'No shipped mobile app yet — but he\'s **React-deep**, which is most of the React Native on-ramp. His UIs are fully responsive/mobile-first.' },
}
