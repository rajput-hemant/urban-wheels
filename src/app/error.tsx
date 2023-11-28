"use client";

import React from "react";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 xl:max-w-6xl">
      <main className="flex w-full flex-col items-center justify-center gap-4 py-52">
        <h2 className="text-center text-2xl font-bold">
          Something went wrong!
        </h2>

        <p className="text-muted-foreground mb-4 max-w-prose text-center">
          It seems like there&apos;s a hiccup on our end. Our team is working
          hard to fix the issue. We appreciate your patience and understanding.
        </p>

        <Button onClick={() => reset()} className="text-sm xl:hidden">
          Try again
        </Button>

        <Button
          size="lg"
          onClick={() => reset()}
          className="hidden text-sm xl:flex"
        >
          Try again
        </Button>
      </main>
    </div>
  );
}
