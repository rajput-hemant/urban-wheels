import type {
  cars,
  locations,
  newsletterSubscribers,
  rentalReservations,
  testimonials,
} from "./schema/tables";

export type Location = typeof locations.$inferInsert;

export type Car = typeof cars.$inferInsert;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export type Testimonial = typeof testimonials.$inferInsert;

export type RentalReservation = typeof rentalReservations.$inferInsert;
