# Nyra API Documentation

## Base URL

`http://localhost:3498/api`

---

## Authentication

### Discord OAuth Flow

#### 1. Initiate Login

```
GET /api/auth/discord
```

Redirects user to Discord OAuth2 authorization page.

**Scopes requested:** `identify guilds`

---

#### 2. OAuth Callback

```
GET /api/auth/callback?code={code}
```

Exchanges authorization code for access token and stores session.

**Response:** Redirects to `/dashboard` on success, `/login?error=...` on failure.

**Cookies Set:**

- `discord_token` — Access token (httpOnly)
- `discord_user` — User info JSON (httpOnly)

---

#### 3. Get Current User

```
GET /api/auth/me
```

**Response (authenticated):**

```json
{
  "user": {
    "id": "123456789",
    "username": "User",
    "avatar": "abc123",
    "discriminator": "0"
  }
}
```

**Response (not authenticated):**

```json
{
  "user": null
}
```

---

#### 4. Logout

```
DELETE /api/auth/me
```

Clears session cookies.

**Response:**

```json
{
  "success": true
}
```

---

#### 5. Get User's Guilds

```
GET /api/auth/guilds
```

Returns guilds where user has `MANAGE_GUILD` permission.

**Response:**

```json
{
  "guilds": [
    {
      "id": "123456789",
      "name": "My Server",
      "icon": "abc123",
      "hasBot": false
    }
  ]
}
```

**Errors:**

- `401` — Not authenticated
- `500` — Failed to fetch from Discord

---

## Moderation (Planned)

### Get Infractions

```
GET /api/guilds/{guildId}/infractions
```

Query params:

- `userId` — Filter by user
- `action` — Filter by type (WARN, MUTE, KICK, BAN)
- `limit` — Max results (default 50)
- `offset` — Pagination offset

---

### Create Infraction

```
POST /api/guilds/{guildId}/infractions
```

Body:

```json
{
  "userId": "123",
  "action": "WARN",
  "reason": "Spam",
  "duration": null
}
```

---

### Emergency Actions

#### Server Lockdown

```
POST /api/guilds/{guildId}/lockdown
```

Body: `{ "enabled": true }`

#### Global Slowmode

```
POST /api/guilds/{guildId}/slowmode
```

Body: `{ "seconds": 30 }`

---

## Support (Planned)

### Tickets

```
GET /api/guilds/{guildId}/tickets
POST /api/guilds/{guildId}/tickets
PATCH /api/guilds/{guildId}/tickets/{ticketId}
DELETE /api/guilds/{guildId}/tickets/{ticketId}
```

### Appeals

```
GET /api/guilds/{guildId}/appeals
PATCH /api/guilds/{guildId}/appeals/{appealId}
```

### Suggestions

```
GET /api/guilds/{guildId}/suggestions
PATCH /api/guilds/{guildId}/suggestions/{id}/status
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

Common status codes:

- `400` — Bad request
- `401` — Not authenticated
- `403` — Forbidden (no permission)
- `404` — Not found
- `500` — Internal server error
