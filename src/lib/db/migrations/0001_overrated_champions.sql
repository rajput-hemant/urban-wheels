CREATE TABLE IF NOT EXISTS "urban_wheels_cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"body_style" text NOT NULL,
	"engine_type" text NOT NULL,
	"transmission" text NOT NULL,
	"seats" integer NOT NULL,
	"descriptions" text[] NOT NULL,
	"features" text[] NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"reviews" integer NOT NULL,
	"unlimited_mileage" boolean,
	"image_url" text NOT NULL,
	"retail_price_per_day" integer NOT NULL,
	"retail_price_currency" text NOT NULL,
	"discounted_price_per_day" integer,
	"discounted_price_currency" text,
	CONSTRAINT "urban_wheels_cars_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urban_wheels_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	CONSTRAINT "urban_wheels_locations_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urban_wheels_newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urban_wheels_rental_reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"car_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"check_in" timestamp NOT NULL,
	"check_out" timestamp NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urban_wheels_testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"comment" text NOT NULL,
	"username" text NOT NULL,
	"image_url" text NOT NULL
);
