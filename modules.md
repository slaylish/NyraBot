# Nyra Modules Documentation

## Overview

Nyra is a modular Discord bot platform with two core modules: **Sentry** (Moderation) and **Support** (Community Assistance).

---

## Module: Sentry (Moderation)

**Base URL:** `/dashboard/{guild_id}/moderation`

### Routes

| Route       | Status   | Description                                         |
| ----------- | -------- | --------------------------------------------------- |
| `/`         | ✅ Done  | HUD with Traffic Light, Metrics, Emergency Controls |
| `/logs`     | ✅ Done  | Infraction history data grid                        |
| `/automod`  | ⚠️ Basic | Anti-spam, content filters, anti-raid config        |
| `/scaling`  | ⚠️ Basic | Punishment ladder configuration                     |
| `/settings` | ⚠️ Basic | Log channels, exemptions, DM policy                 |

### Features

#### 1. Traffic Light System

Visual status indicator:

- 🟢 **Green** — Normal operations
- 🟡 **Yellow** — Elevated activity detected
- 🔴 **Red** — Lockdown/Raid mode active

#### 2. Emergency Controls

- **Server Lockdown** — Deny SEND_MESSAGES in all public channels
- **Join Gate** — Require phone verification for new members
- **Global Slowmode** — Set slowmode across all text channels (0-60s)

#### 3. Infraction Types

`WARN` | `MUTE` | `KICK` | `BAN` | `UNBAN`

#### 4. Auto-Sentry Features (Planned)

- Anti-Spam (burst limit, duplicate detection, mention spam)
- Content Filters (link policy, word blacklist, regex)
- Anti-Raid (join velocity, account age, avatar detection)

---

## Module: Support (Community Assistance)

**Base URL:** `/dashboard/{guild_id}/support`

### Routes

| Route          | Status     | Description                            |
| -------------- | ---------- | -------------------------------------- |
| `/`            | ✅ Done    | Overview with KPIs, active queue       |
| `/tickets`     | 🔲 Planned | Ticket center with panel configuration |
| `/appeals`     | 🔲 Planned | Ban appeal review queue                |
| `/suggestions` | 🔲 Planned | Kanban board for suggestions           |
| `/messages`    | 🔲 Planned | Embed builder & broadcast manager      |
| `/settings`    | 🔲 Planned | Transcript channel, roles, blacklist   |

### Features

#### 1. KPIs Tracked

- Open Tickets
- Pending Appeals
- Active Suggestions
- Average Resolution Time

#### 2. Ticket System (Planned)

- Category builder with custom forms
- Web-based inbox for staff
- Quick actions: Claim, Close, Transcript, Move

#### 3. Appeal System (Planned)

- Configurable cooldowns and retry limits
- Card-based review queue
- Approve/Deny/Request Info actions

#### 4. Suggestion Box (Planned)

- Kanban columns: Incoming → In Review → Approved → Implemented → Denied
- Upvote thresholds and trending detection
- Discord mirror for status updates

---

## Bot Commands

### Moderation

| Command     | Description          | Permission       |
| ----------- | -------------------- | ---------------- |
| `/kick`     | Kick a user          | KICK_MEMBERS     |
| `/ban`      | Ban a user           | BAN_MEMBERS      |
| `/mute`     | Timeout a user       | MODERATE_MEMBERS |
| `/warn`     | Issue a warning      | MODERATE_MEMBERS |
| `/purge`    | Bulk delete messages | MANAGE_MESSAGES  |
| `/lockdown` | Lock current channel | MANAGE_CHANNELS  |

---

## Database Models

### Infraction

```typescript
{
  guildId: string;
  userId: string;
  action: 'WARN' | 'MUTE' | 'KICK' | 'BAN' | 'UNBAN';
  reason: string;
  moderatorId: string;
  timestamp: Date;
  duration?: number; // milliseconds
}
```

---

## Progress Legend

- ✅ Done — Fully implemented
- ⚠️ Basic — UI exists but needs backend integration
- 🔲 Planned — Not yet implemented
