import Link from "next/link";
import { User2 } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Icons } from "../icons";
import { Button } from "../ui/button";

export function SiteHeader() {
  return (
    <header className="bg-background/25 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center space-x-4">
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-1 font-bold">
            <Icons.logo className="h-6 w-6" />
            <span>{siteConfig.name}</span>
          </div>
        </Link>

        <div className="flex flex-1 justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground rounded-full border"
          >
            <User2 />
          </Button>
        </div>
      </div>
    </header>
  );
}
