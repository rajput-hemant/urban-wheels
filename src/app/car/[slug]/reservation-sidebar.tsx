import { Star } from "lucide-react";

import type { Location } from "@/types/location";
import { formatCurrency } from "@/lib/utils";

import { ReservationForm } from "./reservation-form";

type ReservationSidebarProps = {
  pricePerDay: number;
  currency: string;
  rating: number;
  reviews: number;
  locations: Location[];
};

export function ReservationSidebar({
  pricePerDay,
  currency,
  rating,
  reviews,
  locations,
}: ReservationSidebarProps) {
  return (
    <div className="hidden normal-nums lg:block">
      <div className="sticky top-24 rounded-xl border p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-1 items-baseline gap-4 lg:grid-cols-2">
          <div className="flex items-baseline gap-1.5 ">
            <span className="shrink-0 text-xl font-semibold tracking-tight">
              {formatCurrency(pricePerDay, currency)}
            </span>
            <span className="text-muted-foreground">day</span>
          </div>

          <div className="flex items-baseline gap-1 tracking-tight lg:justify-end">
            <Star className="h-3.5 w-3.5 self-center" />

            <span className="text-sm font-medium">{rating}</span>
            {reviews > 0 && (
              <>
                <span>·</span>
                <span className="text-muted-foreground text-sm">
                  {reviews} reviews
                </span>
              </>
            )}
          </div>
        </div>

        <ReservationForm
          locations={locations}
          pricePerDay={pricePerDay}
          currency={currency}
        />
      </div>
    </div>
  );
}
