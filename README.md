# Prashant Parmar — Portfolio v3

Personal portfolio as a **Vite + React 19 + TypeScript** single-page app — the enhanced
successor to portfolio v2. Motion-rich, fully responsive, `prefers-reduced-motion` friendly.

**New in v3**
- 🌗 **Dark mode** — token-driven theme with a nav toggle, saved preference, and no first-paint flash
- 🤖 **AI assistant** — "Ask AI" chat widget that answers questions about Prashant.
  Runs on a built-in local knowledge engine (free, instant, no backend); when deployed
  on Vercel with an `ANTHROPIC_API_KEY`, it automatically upgrades to **Claude** for
  free-form answers via `api/chat.ts`
- 🔎 **SEO/social** — OpenGraph + Twitter meta, JSON-LD Person schema, canonical URL

## Tech stack

- **React 19** + **TypeScript** (strict) · **Vite 5**
- Hand-written CSS (no framework) — design tokens + `[data-theme="dark"]` overrides in `src/index.css`
- Vanilla-JS interaction layer in `useAnimations` (scroll reveals, typewriter, count-up, marquee, magnetic buttons, avatar)
- `@anthropic-ai/sdk` (serverless function only)

## Getting started

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # tsc --noEmit && vite build → dist/
npm run preview
```

No environment variables required for local dev — the chat widget uses its local engine.

## Project structure

```
portfolio-v3/
├── index.html                  # meta/OG/JSON-LD, theme boot script, fonts
├── api/
│   └── chat.ts                 # optional Claude endpoint (Vercel serverless)
├── public/
│   ├── resume.pdf              # résumé the site links to
│   └── resume.html             # résumé source (re-render → PDF, see below)
└── src/
    ├── App.tsx                 # section composition + ChatWidget
    ├── index.css               # entire design system, light+dark tokens, chat styles
    ├── hooks/
    │   ├── useAnimations.ts
    │   └── useTheme.ts         # dark-mode state (localStorage + prefers-color-scheme)
    ├── lib/
    │   ├── chatKB.ts           # assistant knowledge base
    │   └── chatEngine.ts       # scoring engine + /api/chat fallback logic
    └── components/             # Nav, Hero, Work, Experience, AIDev, Skills,
                                # About, Contact, Footer, ChatWidget, …
```

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


## Deploying (Vercel)

1. Import the repo — framework auto-detects as Vite (build `npm run build`, output `dist`)
2. The `api/` folder deploys as a serverless function automatically
3. **Optional — enable real-LLM chat** by adding **one** env var (checked in this order):

   | Env var | Where to get it | Cost | Default model |
   |---|---|---|---|
   | `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | paid, best quality | `claude-opus-4-8` |
   | `GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) | **FREE** (no card) | `llama-3.3-70b-versatile` |
   | `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | **FREE** tier | `gemini-2.5-flash` |
   | `OPENROUTER_API_KEY` | [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) | free models | `llama-3.3-70b :free` |

   `CHAT_MODEL` optionally overrides the model for whichever provider is active.

Without a key, the assistant transparently uses its local knowledge engine — the site
is fully functional on any static host.

## Regenerating the résumé PDF

`public/resume.pdf` is rendered from `public/resume.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/resume.pdf" "file://$(pwd)/public/resume.html"
```

---

Hand-built by Prashant Parmar · React · TypeScript · Vite · AI-powered workflow
