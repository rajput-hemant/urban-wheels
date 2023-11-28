import { db } from ".";
import * as placeholder from "./placeholder";
import {
  cars,
  locations,
  newsletterSubscribers,
  rentalReservations,
  testimonials,
} from "./schema/tables";

async function seedNewsletterSubscribers() {
  try {
    const seededSubscribers = await db
      .insert(newsletterSubscribers)
      .values(placeholder.newsletterSubscribers)
      .onConflictDoNothing({ target: newsletterSubscribers.id })
      .returning();

    console.log(`Seeded ${seededSubscribers.length} newsletter_subscribers`);
  } catch (error) {
    console.error("Error seeding newsletter_subscribers:", error);
    throw error;
  }
}

async function seedTestimonials() {
  try {
    const seededTestimonial = await db
      .insert(testimonials)
      .values(placeholder.testimonials)
      .onConflictDoNothing({ target: testimonials.id })
      .returning();

    console.log(`Seeded ${seededTestimonial.length} testimonials`);
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    throw error;
  }
}

async function seedCars() {
  try {
    const seededCars = await db
      .insert(cars)
      .values(placeholder.cars)
      .onConflictDoNothing({ target: cars.id })
      .returning();

    console.log(`Seeded ${seededCars.length} cars`);
  } catch (error) {
    console.error("Error seeding cars:", error);
    throw error;
  }
}

async function seedLocations() {
  try {
    const seededLocations = await db
      .insert(locations)
      .values(placeholder.locations)
      .onConflictDoNothing({ target: locations.id })
      .returning();

    console.log(`Seeded ${seededLocations.length} locations`);
  } catch (error) {
    console.error("Error seeding locations:", error);
    throw error;
  }
}

async function seedRentalReservations() {
  try {
    const seedReservations = await db
      .insert(rentalReservations)
      .values(placeholder.rentalReservations)
      .onConflictDoNothing({ target: rentalReservations.id })
      .returning();

    console.log(`Seeded ${seedReservations.length} rental_reservations`);
  } catch (error) {
    console.error("Error seeding rental_reservations:", error);
    throw error;
  }
}

(async () => {
  await seedTestimonials();
  await seedCars();
  await seedLocations();
  await seedRentalReservations();
  await seedNewsletterSubscribers();

  console.log("Seeding complete, exiting...");

  process.exit(0);
})();
