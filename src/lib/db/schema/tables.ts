import {
  boolean,
  integer,
  numeric,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { createTable } from "../table-creator";

export const newsletterSubscribers = createTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  created_at: timestamp("created_at", { mode: "date" }),
});

export const testimonials = createTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  comment: text("comment").notNull(),
  username: text("username").notNull(),
  image_url: text("image_url").notNull(),
});

export const cars = createTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  body_style: text("body_style").notNull(),
  engine_type: text("engine_type").notNull(),
  transmission: text("transmission").notNull(),
  seats: integer("seats").notNull(),
  descriptions: text("descriptions").array().notNull(),
  features: text("features").array().notNull(),
  // TODO: add a check constraint to ensure that rating is between 0 and 5
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").notNull(),
  unlimited_mileage: boolean("unlimited_mileage"),
  image_url: text("image_url").notNull(),
  retail_price_per_day: integer("retail_price_per_day").notNull(),
  retail_price_currency: text("retail_price_currency").notNull(),
  discounted_price_per_day: integer("discounted_price_per_day"),
  discounted_price_currency: text("discounted_price_currency"),
});

export const locations = createTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull().unique(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  featured: boolean("featured").default(false).notNull(),
});

export const rentalReservations = createTable("rental_reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  car_id: uuid("car_id").notNull(),
  user_id: uuid("user_id").notNull(),
  location_id: uuid("location_id").notNull(),
  check_in: timestamp("check_in", { mode: "date" }).notNull(),
  check_out: timestamp("check_out", { mode: "date" }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).notNull(),
});
