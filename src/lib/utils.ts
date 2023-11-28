import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { siteConfig } from "@/config/site";

/**
 * Merges the given class names with the tailwind classes
 * @param inputs The class names to merge
 * @returns The merged class names
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Returns the absolute url for the given path based on the current environment
 * @param path The path to get the absolute url for
 * @returns The absolute url for the given path
 */
export function absoluteUrl(path: string) {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case "production":
      return `${siteConfig.url}${path}`;

    case "preview":
      return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}${path}`;

    default:
      // development
      return `http://localhost:${process.env.PORT ?? 3000}${path}`;
  }
}

/**
 * Sets the given CSS variable to the given value
 * @param name The property name of the CSS variable
 * @param value The value to set the CSS variable to
 */
export const setCSSVariable = (name: string, value: string) => {
  if (typeof window !== "undefined" && window?.document?.documentElement) {
    window.document.documentElement.style.setProperty(name, value);
  }
};

/**
 * Creates a URL from the given pathname and params
 * @param pathname The pathname to create the URL for
 * @param params The params to create the URL for
 * @returns The created URL
 */
export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

/**
 * Formats the given amount to the given currency
 * @param amount The amount to format
 * @param currency The currency to format the amount to
 * @returns The formatted amount
 */
export const formatCurrency = (amount: number, currency: string = "USD") => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
