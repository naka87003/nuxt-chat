import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma CLI commands use a direct or session-pooled connection. Runtime
  // requests use DATABASE_URL through the pg driver adapter instead.
  datasource: {
    url: env("DIRECT_URL"),
  },
});
