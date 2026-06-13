# ArkAgent

**Hire an AI employee, not another app.**

ArkAgent is the marketing site + product console for an autonomous-agent platform —
deployed on **arkagent.ai** (global) and **iagent.cc** (中国大陆). Each agent is a real
autonomous worker (OpenClaw or Hermes engine) running on a dedicated VM: you brief it
like a person, then manage it from Telegram / WhatsApp / WeChat / LINE / Slack / Email
or the web console.

This repository is a faithful implementation of the
[Claude Design](https://claude.ai/design) prototype `ArkAgent.dc.html`, rebuilt as a
production-style **Next.js App Router** application.

## Stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, React Compiler) |
| UI | **React 19** + **TypeScript 5** (strict) |
| Styling | Inline-style port of the design tokens — see [`lib/theme.ts`](lib/theme.ts) |
| Fonts | Space Grotesk · Instrument Sans · IBM Plex Mono · Newsreader (via `next/font`) |
| State | React Context store ([`lib/store.tsx`](lib/store.tsx)) for cross-route state |

The brand is **"Terminal Lime"** — `#0B0D10` ink, hairline `#1B212C` grid, a single
lime signal color `#D8FF3E`, mono data labels and employee-card motifs.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

A fixed **demo navigator pill** at the bottom of every screen jumps between flows.

## Screens

| Route | Screen |
|---|---|
| `/` | Landing — hero with a live employee card, 8-role roster, engines, self-review, pricing. Tri-lingual **EN / 简 / 繁** switcher (defaults from browser locale). |
| `/auth` | Sign in · Create account · Forgot password (+ Google / WeChat SSO). |
| `/hire` | 4-step hire wizard — Role → Brief (with ✦ AI auto-generate) → Engine & channels → Review, then an animated VM-provisioning launch. The new agent joins the dashboard. |
| `/dashboard` | Overview — KPIs, roster, live activity. |
| `/dashboard/fleet` | Fleet grid — Manage / Pause / Chat per agent. |
| `/dashboard/fleet/[id]` | Agent detail — Activity · Tasks · **Chat** (with replies) · Performance (approval queue) · Settings. |
| `/dashboard/channels` | Per-channel configuration (bot tokens, WeChat AppID, LINE secret…). |
| `/dashboard/billing` | Credit allowance, usage chart + projection, per-agent usage, invoices, with date ranges. |
| `/payment` | Region-aware checkout — **Stripe** (global) or **Alipay 支付宝** (中国大陆), monthly/annual. |
| `/directions` | The three brand directions explored: A · Terminal Lime (live), B · Ivory Studio, C · Midnight Console. |

## Project layout

```
app/                      route segments (one client component per screen)
  layout.tsx              fonts + AppProvider + DemoPill
  page.tsx                landing
  auth/ hire/ payment/ directions/
  dashboard/
    layout.tsx            sidebar shell
    page.tsx              overview
    fleet/ channels/ billing/
components/
  ui.tsx                  hover-aware <Btn> / <HoverDiv>
  DemoPill.tsx            bottom screen navigator
lib/
  theme.ts                design tokens (colors, role hues, fonts, grid)
  types.ts                domain types
  data.ts                 roster, AI-brief copy, channels, billing datasets
  i18n.ts                 EN / 简 / 繁 dictionaries + locale detection
  store.tsx               cross-route state (language, hired agent, pause toggles)
```

> The visuals are a pixel port of an HTML/CSS/JS prototype. Backend wiring (real
> Stripe Elements / Alipay SDK, agent VMs, channel webhooks, auth) would slot into
> the same layouts.
