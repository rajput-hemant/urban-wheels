"use client";

import { currentlyInDeveltopmentToast } from "@/components/development-toast";
import { Button } from "@/components/ui/button";

export function PayButton() {
  return (
    <Button
      size="lg"
      className="w-full text-lg"
      onClick={currentlyInDeveltopmentToast}
    >
      Pay
    </Button>
  );
}
