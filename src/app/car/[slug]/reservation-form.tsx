"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, differenceInDays, format, isAfter } from "date-fns";
import { Check } from "lucide-react";
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
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { SearchParams } from "@/lib/enums";
import { cn, formatCurrency } from "@/lib/utils";

const FormSchema = z
  .object({
    location: z.string({ required_error: "Location is required" }),
    checkin: z.date({ required_error: "Check in is required" }),
    checkout: z.date({ required_error: "Check out is required" }),
  })
  .refine((schema) => isAfter(schema.checkout, schema.checkin), {
    message: "Check out must be after check in",
    path: ["checkout"],
  });

type ReservationFormProps = {
  locations: Location[];
  pricePerDay: number;
  currency: string;
};

export function ReservationForm({
  locations,
  pricePerDay,
  currency,
}: ReservationFormProps) {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { checkin, checkout, location } = values;
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              {
                location,
                checkin: format(checkin, "LLL dd, y"),
                checkout: format(checkout, "LLL dd, y"),
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
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

  const checkIn = addDays(new Date(), 7);
  const checkOut = addDays(new Date(), 14);

  const days = differenceInDays(checkOut, checkIn);
  const taxesAndFees = pricePerDay * days * 0.16;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-6 w-full rounded-xl border">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="relative space-y-0">
                  <FormLabel className="absolute left-2.5 top-2.5 text-xs font-bold">
                    Pick-up / Drop-off
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          aria-label="select location"
                          className="text-muted-foreground hover:text-foreground flex h-[58px] w-full flex-col justify-end truncate border-b p-2.5 text-left text-sm duration-200"
                        >
                          {field.value ?
                            locations.find(({ value }) => value === field.value)
                              ?.name
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
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem className="relative space-y-0 border-r">
                    <FormLabel className="absolute left-2.5 top-2.5 text-xs font-bold leading-none">
                      Check in
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <button className="text-muted-foreground hover:text-foreground flex h-14 w-full flex-col justify-end truncate p-2.5 text-left text-sm duration-200">
                            {field.value ?
                              format(field.value, "dd/MM/yyyy")
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkout"
                render={({ field }) => (
                  <FormItem className="relative space-y-0">
                    <FormLabel className="absolute left-2.5 top-2.5 text-xs font-bold leading-none">
                      Check out
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <button className="text-muted-foreground hover:text-foreground flex h-14 w-full flex-col justify-end truncate p-2.5 text-left text-sm duration-200">
                            {field.value ?
                              format(field.value, "dd/MM/yyyy")
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
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div
            aria-live="polite"
            className="mx-auto mt-2 flex w-full flex-wrap items-center justify-between space-y-1 text-xs font-medium text-red-500"
          >
            {form.formState.errors.location && (
              <p>{form.formState.errors.location.message}</p>
            )}
            {form.formState.errors.checkin && (
              <p>{form.formState.errors.checkin.message}</p>
            )}
            {form.formState.errors.checkout && (
              <p>{form.formState.errors.checkout.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="mt-4 w-full text-base">
            Reserve
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        You won&apos;t be charged yet
      </p>

      <hr className="my-4" />

      <div className="text-muted-foreground mt-4">
        <div className="flex items-center justify-between">
          <p>
            {formatCurrency(pricePerDay, currency)} x {days}{" "}
            {days > 1 ? "days" : "day"}
          </p>
          <p>{formatCurrency(pricePerDay * days, currency)}</p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <p>Taxes and fees</p>
          <p>{formatCurrency(taxesAndFees, currency)}</p>
        </div>

        <hr className="my-4" />

        <div className="text-foreground flex items-center justify-between font-semibold">
          <p>Total (taxes included)</p>
          <p>{formatCurrency(pricePerDay * days + taxesAndFees, currency)}</p>
        </div>
      </div>
    </>
  );
}
