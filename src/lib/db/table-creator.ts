import { pgTableCreator } from "drizzle-orm/pg-core";

import { siteConfig } from "@/config/site";

/**
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `${siteConfig.name.toLowerCase().replace(/\s/g, "_")}_${name}`
);
