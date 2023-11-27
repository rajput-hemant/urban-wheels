import { text } from "drizzle-orm/pg-core";

import { createTable } from "../table-creator";

export const users = createTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
});
