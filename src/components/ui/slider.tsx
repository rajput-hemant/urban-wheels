"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    classNames?: Partial<{ track: string; range: string; thumb: string }>;
  }
>(({ className, classNames, value, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    value={value}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderTrack className={classNames?.track}>
      <SliderRange className={classNames?.range} />
    </SliderTrack>

    <SliderThumb className={classNames?.thumb} />
    {value?.length === 2 && <SliderThumb className={classNames?.thumb} />}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    className={cn(
      "bg-secondary relative h-2 w-full grow overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
SliderTrack.displayName = SliderPrimitive.Track.displayName;

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    ref={ref}
    className={cn("bg-primary absolute h-full", className)}
    {...props}
  />
));
SliderRange.displayName = SliderPrimitive.Range.displayName;

const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={cn(
      "border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 cursor-pointer rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

export { Slider };
