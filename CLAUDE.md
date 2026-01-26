# Project: NyraBot Monolith

## Overview

Monolithic Discord bot platform with Next.js 14 dashboard and Discord.js v14 bot.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS v3, Framer Motion
- **Backend**: Discord.js v14, Mongoose (MongoDB)
- **Icons**: Inline SVG (custom)
- **Font**: Outfit (via `next/font/google`)
- **Language**: TypeScript

## Quick Start

```bash
npm install
npm run dev    # Development (hot reload)
npm run build  # Production build
npm start      # Production server + bot
```

## Environment Variables

```
MONGO_URI=mongodb+srv://...
DISCORD_TOKEN=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=http://localhost:3498/api/auth/callback
```

## Architecture

- **Port**: 3498
- **Web**: Next.js App Router
- **Bot**: Runs concurrently via `tsx watch`
- **DB**: MongoDB Atlas

## Key Directories

```
src/
├── app/                    # Next.js pages
│   ├── api/auth/           # OAuth endpoints
│   ├── dashboard/          # Server management
│   │   └── [guildId]/
│   │       ├── moderation/ # Sentry module
│   │       └── support/    # Support module
│   ├── login/
│   └── premium/
├── bot/
│   ├── index.ts            # Bot entry
│   ├── commands.ts         # Slash commands
│   └── models/             # Mongoose schemas
└── components/
    └── Navbar.tsx          # Global nav
```

## Documentation

- `modules.md` — Module architecture & progress
- `API.md` — Endpoint documentation

## Modules

1. **Sentry** (Moderation) — `/dashboard/{id}/moderation`
2. **Support** (Tickets/Appeals) — `/dashboard/{id}/support`

See `modules.md` for detailed feature breakdown.
