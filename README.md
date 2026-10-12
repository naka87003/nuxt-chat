# Nuxt Chat

A full-stack, authenticated chat application built with Nuxt 4. Users sign in with GitHub, organize conversations into projects, and generate or stream responses from OpenAI.

**Live demo:** [nuxt-chat-psi.vercel.app](https://nuxt-chat-psi.vercel.app/)

## Features

- GitHub OAuth sign-in with server-side sessions
- Per-user chat and project management
- OpenAI-powered response generation and streaming
- PostgreSQL persistence through Prisma
- Standard Nuxt directories for UI, authentication, and chat concerns
- Vercel-ready production configuration

## Tech stack

- [Nuxt 4](https://nuxt.com/), Vue 3, and TypeScript
- [Nuxt UI](https://ui.nuxt.com/)
- [Prisma](https://www.prisma.io/) with PostgreSQL
- [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils) and GitHub OAuth
- [AI SDK](https://ai-sdk.dev/) with OpenAI
- pnpm

## Prerequisites

- Node.js 20.19 or later (Node.js 22 LTS recommended)
- pnpm 10.28.0
- A PostgreSQL database
- A GitHub OAuth App
- An OpenAI API key

Enable Corepack before installing dependencies if pnpm is not already available:

```bash
corepack enable
corepack prepare pnpm@10.28.0 --activate
```

## Getting started

Install dependencies. The `postinstall` script generates the Prisma Client and prepares Nuxt types automatically.

```bash
pnpm install
```

Create a `.env` file in the project root:

```dotenv
# PostgreSQL / Supabase
# Runtime URL. For Vercel or another serverless host, use the Supavisor
# transaction-pooler URL (port 6543) and append ?pgbouncer=true.
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
# Prisma CLI URL. Use Supabase's direct URL, or its session-pooler URL (port 5432)
# when the direct endpoint is unavailable from your network.
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

# nuxt-auth-utils session encryption; use a long, random value (32+ characters)
NUXT_SESSION_PASSWORD="replace-with-a-long-random-secret"

# GitHub OAuth App credentials
NUXT_OAUTH_GITHUB_CLIENT_ID=""
NUXT_OAUTH_GITHUB_CLIENT_SECRET=""

# OpenAI
NUXT_OPENAI_API_KEY=""
```

Create and apply the database schema:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

The app is available at `http://localhost:3000`. Set the GitHub OAuth App callback URL to:

```text
http://localhost:3000/auth/github
```

## Available commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Create a production build. |
| `pnpm preview` | Run the production build locally. |
| `pnpm generate` | Generate a static site. |
| `pnpm lint` | Run ESLint. |
| `pnpm lint:fix` | Run ESLint and apply safe fixes. |
| `pnpm typecheck` | Run Nuxt and TypeScript type checks. |
| `pnpm prisma migrate dev` | Create and apply a development migration. |
| `pnpm prisma generate` | Regenerate the Prisma Client. |

Run the same quality checks expected before deployment with:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

## Deployment on Vercel

1. Import the repository into Vercel.
2. Set the project Node.js version to Node.js 20.19 or later.
3. Add the environment variables listed above for the appropriate environments. Use your production callback URL for `NUXT_OAUTH_GITHUB_CLIENT_ID` / `NUXT_OAUTH_GITHUB_CLIENT_SECRET`, and register `https://YOUR_DOMAIN/auth/github` in the GitHub OAuth App.
4. Configure a PostgreSQL database and set `DATABASE_URL` and `DIRECT_URL`. With
   Supabase, use the Transaction pooler URL (port `6543`, with
   `?pgbouncer=true`) for `DATABASE_URL`, and a Direct or Session pooler URL
   (port `5432`) for `DIRECT_URL`.
5. Connect the Vercel KV integration required by the production Nitro storage configuration.
6. In **Settings → Build and Deployment**, override the Build Command with:

   ```bash
   pnpm lint && pnpm typecheck && pnpm build
   ```

This makes Vercel fail a Preview or Production deployment when linting, type checking, or the build fails.

## Project structure

```text
app/                    # Pages, layouts, components, composables, and styles
server/                 # APIs, repositories, services, routes, and utilities
shared/                 # Shared TypeScript types
prisma/                 # Prisma schema and migrations
public/                 # Static assets
```

## Database changes

Update `prisma/schema.prisma`, then create a migration:

```bash
pnpm prisma migrate dev --name describe-your-change
```

Commit the generated migration under `prisma/migrations/`. In production, apply committed migrations through your deployment workflow with `pnpm prisma migrate deploy`.

## License

No license has been specified for this repository.
