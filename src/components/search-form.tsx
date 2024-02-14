"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, isAfter } from "date-fns";
import { Check, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Location } from "@/lib/db/definitions";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SearchParams } from "@/lib/enums";
import { cn, createUrl } from "@/lib/utils";

const FormSchema = z
  .object({
    location: z.string({ required_error: "Location is required" }),
    checkin: z.date({ required_error: "Check in is required" }),
    checkout: z.date({ required_error: "Check out is required" }),
  })
  .refine(({ checkin, checkout }) => isAfter(checkout, checkin), {
    message: "Check out must be after check in",
    path: ["checkout"],
  });

type SearchFormProps = React.HTMLAttributes<HTMLFormElement> & {
  locations: Location[];
  compact?: boolean;
};

export function SearchForm({
  locations,
  compact = false,
  className,
  ...props
}: SearchFormProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { location, checkin, checkout } = values;

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete(SearchParams.LOCATION);
    newParams.delete(SearchParams.CHECKIN);
    newParams.delete(SearchParams.CHECKOUT);

    newParams.set(SearchParams.LOCATION, location);
    const checkinISOString = checkin.toISOString();
    if (checkinISOString) newParams.set(SearchParams.CHECKIN, checkinISOString);

    const checkoutISOString = checkout.toISOString();
    if (checkoutISOString)
      newParams.set(SearchParams.CHECKOUT, checkoutISOString);

    push(createUrl("/cars", newParams));
  }

  React.useEffect(() => {
    const location = searchParams.get(SearchParams.LOCATION);
    const checkin = searchParams.get(SearchParams.CHECKIN);
    const checkout = searchParams.get(SearchParams.CHECKOUT);

    if (location) form.setValue("location", location);
    if (checkin) form.setValue("checkin", new Date(checkin));
    if (checkout) form.setValue("checkout", new Date(checkout));

    return () => {
      form.resetField("location");
      form.resetField("checkin");
      form.resetField("checkout");
    };
  }, [searchParams, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "bg-background relative mx-auto grid grid-cols-[1.25fr_auto_1fr_auto_1fr_auto] items-center justify-between gap-x-2 whitespace-nowrap rounded-full border",
          compact ? "h-14 w-[720px] px-2 py-1" : "h-[68px] w-[860px] px-3 py-2",
          className
        )}
        {...props}
      >
        <div className="relative">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid size-full grid-cols-1 items-start justify-center space-y-0 overflow-x-hidden px-4">
                <FormLabel
                  className={cn(
                    "inline-block size-full font-bold",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  Pick-up / Drop-off
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        role="combobox"
                        aria-label="select location"
                        aria-controls="location-menu"
                        aria-expanded
                        className={cn(
                          "text-muted-foreground text-left text-sm",
                          field.value && "font-medium"
                        )}
                      >
                        {field.value ?
                          locations.find(
                            (location) => location.value === field.value
                          )?.name
                        : "Select location"}
                      </button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandEmpty>No place found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map(({ name, value }) => (
                          <CommandItem
                            key={value}
                            value={name}
                            onSelect={() => {
                              form.setValue("location", value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4 shrink-0",
                                value === field.value ?
                                  "opacity-100"
                                : "opacity-0"
                              )}
                            />
                            {name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage
                  className={cn(
                    "absolute overflow-hidden text-ellipsis",
                    compact ? "top-14 text-xs" : "top-16 text-sm"
                  )}
                />
              </FormItem>
            )}
          />
        </div>

        <Separator
          orientation="vertical"
          decorative
          className={compact ? "h-6" : "h-8"}
        />

        <div className="relative">
          <FormField
            control={form.control}
            name="checkin"
            render={({ field }) => (
              <FormItem className="grid h-full shrink-0 grow-0 grid-cols-1 items-start justify-center space-y-0 px-4">
                <FormLabel
                  className={cn(
                    "inline-block size-full font-bold",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  Check in
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        className={cn(
                          "text-muted-foreground text-left text-sm",
                          field.value && "font-medium"
                        )}
                      >
                        {field.value ?
                          format(field.value, "LLL dd, y")
                        : <span>Pick a date</span>}
                      </button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage
                  className={cn(
                    "absolute overflow-hidden text-ellipsis",
                    compact ? "top-14 text-xs" : "top-16 text-sm"
                  )}
                />
              </FormItem>
            )}
          />
        </div>

        <Separator
          orientation="vertical"
          decorative
          className={compact ? "h-6" : "h-8"}
        />

        <div className="relative">
          <FormField
            control={form.control}
            name="checkout"
            render={({ field }) => (
              <FormItem className="grid h-full shrink-0 grow-0 grid-cols-1 items-start justify-center space-y-0 px-4">
                <FormLabel
                  className={cn(
                    "inline-block size-full font-bold",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  Check out
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        className={cn(
                          "text-muted-foreground text-left text-sm",
                          field.value && "font-medium"
                        )}
                      >
                        {field.value ?
                          format(field.value, "LLL dd, y")
                        : <span>Pick a date</span>}
                      </button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= addDays(new Date(), 1)}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage
                  className={cn(
                    "absolute overflow-hidden text-ellipsis",
                    compact ? "top-14 text-xs" : "top-16 text-sm"
                  )}
                />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="icon" className="rounded-full">
          <span className="sr-only">Search</span>
          <Search
            strokeWidth={3}
            className={cn(compact ? "size-4" : "size-5")}
          />
        </Button>
      </form>
    </Form>
  );
}
