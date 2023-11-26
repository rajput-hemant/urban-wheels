import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Icons } from "../icons";
import { NewsletterSubscriptionForm } from "./newsletter-subscription-form";
import { ThemeToggleGroup } from "./theme-toggle-group";

const footerLinks = [
  {
    title: "Destinations",
    links: [
      "Beach Escapes",
      "Historical Trails",
      "Foodie Journeys",
      "Urban Explorations",
      "Wildlife Safaris",
      "Photography Tours",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Car Rental Tips",
      "Travel Insights",
      "Safety Guides",
      "Car Models Guide",
    ],
  },
  {
    title: "Policies",
    links: ["Privacy", "Terms of use", "Cookie Preferences"],
  },
  { title: "Support", links: ["Contact us", "FAQs"] },
];

export function SiteFooter() {
  const githubUrl = siteConfig.links.github;

  return (
    <footer className="border-t py-10">
      <div className="mx-auto w-full max-w-none px-5 text-sm sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-between gap-x-2 gap-y-10 sm:gap-x-6 md:flex md:flex-wrap">
          <div className="col-span-full">
            <Link href="/" className="flex items-center font-semibold">
              <Icons.logo className="h-6" />
              <span>{siteConfig.name}</span>
            </Link>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-2.5">
              <h3 className="mb-1 text-sm font-semibold lg:text-sm">
                {section.title}
              </h3>

              {section.links.map((link) => (
                <a
                  key={link}
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
          <div className="col-span-full flex w-full flex-col gap-2 lg:max-w-[240px]">
            <h3 className="mb-1.5 text-sm font-semibold lg:text-sm">
              Subscribe to our newsletter
            </h3>

            <p className="text-muted-foreground mb-1.5 text-[13px] leading-6 lg:text-sm">
              Join Our Community! Get exclusive travel offers and insider tips.
            </p>
            <NewsletterSubscriptionForm />
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between lg:mt-16">
          <p className="text-sm">
            Built by{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              <strong>{githubUrl.split("/")[3]}</strong>
            </a>
            . The source code is available on{" "}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              <strong>GitHub</strong>
            </a>
            .
          </p>

          <ThemeToggleGroup className="hidden md:flex" />
        </div>
      </div>
    </footer>
  );
}
