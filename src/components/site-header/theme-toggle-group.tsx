"use client";

import React from "react";
import { Monitor, Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsMounted } from "@/hooks/use-is-mouted";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ThemeToggleGroupProps = {
  className?: string;
};

export function ThemeToggleGroup({ className }: ThemeToggleGroupProps) {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  function handleThemeChange(value: string) {
    setTheme(value);
  }

  return (
    <ToggleGroup
      type="single"
      value={isMounted() ? theme : "system"}
      onValueChange={handleThemeChange}
      className={className}
    >
      <ToggleGroupItem
        aria-label="Toggle Dark Mode"
        size="sm"
        value="dark"
        className="px-2"
      >
        <Moon className="h-5" />
      </ToggleGroupItem>

      <ToggleGroupItem
        aria-label="Toggle Light Mode"
        size="sm"
        value="light"
        className="px-2"
      >
        <SunMedium className="h-5" />
      </ToggleGroupItem>

      <ToggleGroupItem
        aria-label="Toggle System Mode"
        size="sm"
        value="system"
        className="px-2"
      >
        <Monitor className="h-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
