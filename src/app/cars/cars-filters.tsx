"use client";

import { Filter } from "lucide-react";

import { currentlyInDeveltopmentToast } from "@/components/development-toast";
import { Button } from "@/components/ui/button";

export function CarsFilters() {
  return (
    <Button variant="outline" onClick={currentlyInDeveltopmentToast}>
      <Filter className="mr-2 h-4 w-4" />
      Filters
    </Button>
  );
}
