import { asc, eq, sql } from "drizzle-orm";

import { db } from ".";
import { env } from "../env.mjs";
import * as placeholder from "./placeholder";
import { cars, locations, testimonials } from "./schema/tables";

export async function fetchTestimonials() {
  if (env.NODE_ENV === "development") {
    return placeholder.testimonials;
  }

  try {
    console.log("Fetching testimonials data...");
    const data = await db.select().from(testimonials);
    console.log("Data fetch complete.");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch testimonials data.");
  }
}

export async function fetchLocations() {
  if (env.NODE_ENV === "development") {
    return placeholder.locations;
  }

  try {
    console.log("Fetching locations data...");
    const data = await db.select().from(locations).orderBy(asc(locations.name));
    console.log("Data fetch complete.");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch locations data.");
  }
}

export async function fetchFeaturedLocations() {
  if (env.NODE_ENV === "development") {
    return placeholder.locations.filter((location) => location.featured);
  }

  try {
    console.log("Fetching featured locations data...");
    const data = await db
      .select()
      .from(locations)
      .where(eq(locations.featured, true));
    console.log("Data fetch complete.");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch featured locations data.");
  }
}

export async function fetchLocationByValue(value: string) {
  if (env.NODE_ENV === "development") {
    return placeholder.locations.find((location) => location.value === value);
  }

  try {
    console.log("Fetching location data...");
    const [data] = await db
      .select()
      .from(locations)
      .where(eq(locations.value, value))
      .limit(1);
    console.log("Data fetch complete.");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchCars() {
  if (env.NODE_ENV === "development") {
    return placeholder.cars;
  }

  try {
    console.log("Fetching cars data...");
    const data = await db.select().from(cars);
    console.log("Data fetch complete.");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cars data.");
  }
}

export async function fetchCarBySlug(slug: string) {
  if (env.NODE_ENV === "development") {
    return placeholder.cars.find((car) => car.slug === slug);
  }

  try {
    const [data] = await db
      .select()
      .from(cars)
      .where(eq(cars.slug, slug))
      .limit(1);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function getMinPriceFromCars() {
  if (env.NODE_ENV === "development") {
    return placeholder.cars.reduce((min, car) => {
      const price =
        car.discounted_price_per_day || car.retail_price_per_day || 0;
      return price < min ? price : min;
    }, Infinity);
  }

  try {
    const query = sql`
      SELECT
        MIN(COALESCE(discounted_price_per_day, retail_price_per_day)) AS min_price
      FROM urban_wheels_cars;
    `;

    const data = await db.execute(query);

    return data[0].min_price as number;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
