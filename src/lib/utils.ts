import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";

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
  if (process.env.VERCEL) {
    switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case "production":
        return `${siteConfig.url}${path}`;

      case "preview":
        return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}${path}`;

      default:
        // development
        return `http://localhost:${process.env.PORT ?? 3000}${path}`;
    }
  } else if (process.env.NETLIFY) {
    switch (process.env.CONTEXT) {
      case "production":
        return `${siteConfig.url}${path}`;

      case "deploy-preview" || "branch-deploy":
        return `https://${process.env.DEPLOY_PRIME_URL}${path}`;

      default:
        // development
        return `http://localhost:${process.env.PORT ?? 3000}${path}`;
    }
  } else {
    return `${siteConfig.url}${path}`;
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
export const formatCurrency = (amount: number, currency: string | null) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: currency ?? "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/**
 * Fetches the GitHub stars for the current repository
 * @returns Repo stars count
 */
export async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.links.github
        .split("/")
        .slice(-2)
        .join("/")}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as { stargazers_count: string };

    return parseInt(json.stargazers_count).toLocaleString();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Converts a string into a slug by replacing spaces with hyphens,
 * removing non-alphanumeric characters, trimming leading and trailing hyphens,
 * and converting the string to lowercase.
 *
 * @param str - The string to be slugified.
 * @returns The slugified string.
 */
export function slugify(str: string) {
  return str
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // remove any non-alphanumeric characters
    .replace(/-+/g, "-") // remove consecutive hyphens
    .replace(/^-+/, "") // trim leading hyphens
    .replace(/-+$/, "") // trim trailing hyphens
    .toLowerCase()
    .trim(); // convert string to lowercase
}
