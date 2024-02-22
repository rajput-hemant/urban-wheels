"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type NavigateBackProps = React.ComponentProps<typeof Button>;

export function NavigateBack({ ...props }: NavigateBackProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      {...props}
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
}
