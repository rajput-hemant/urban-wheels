import type { SelectedFilters } from "../filters";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { Dispatch, SetStateAction } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Transmission } from "@/lib/enums";

const transmissions = [
  { slug: Transmission.AUTOMATIC, name: "Automatic" },
  { slug: Transmission.MANUAL, name: "Manual" },
];

type TransmissionFiltersProps = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

export function TransmissionFilters(props: TransmissionFiltersProps) {
  const { selectedFilters, setSelectedFilters } = props;

  const handleCheckedChange = (
    checked: CheckedState,
    transmission: Transmission
  ) => {
    setSelectedFilters((filters) => {
      const transmissions =
        checked ?
          [...filters.transmissions, transmission]
        : filters.transmissions.filter((t) => t !== transmission);

      return { ...filters, transmissions };
    });
  };

  return (
    <section>
      <h3 className="pb-6 text-xl font-semibold">Transmission</h3>

      <div className="grid grid-cols-2 items-center">
        {transmissions.map(({ slug, name }) => (
          <div key={slug} className="flex items-center py-2">
            <Checkbox
              id={slug}
              checked={selectedFilters.transmissions.includes(slug)}
              onCheckedChange={(checked) => handleCheckedChange(checked, slug)}
              className="size-6 rounded-md"
            />
            <Label
              htmlFor={slug}
              className="w-full cursor-pointer pl-4 text-base font-normal"
            >
              {name}
            </Label>
          </div>
        ))}
      </div>
    </section>
  );
}
