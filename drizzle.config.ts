/* eslint-disable no-restricted-properties */
import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

import type { Config } from "drizzle-kit";

import { siteConfig } from "@/config/site";

loadEnvConfig(cwd());

if (!process.env.DATABASE_URL) {
  console.error("'DATABASE_URL' is not set in the environment variables");
  process.exit(1);
}

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  tablesFilter: [`${siteConfig.name.toLowerCase().replace(/\s/g, "_")}_*`],
} satisfies Config;
