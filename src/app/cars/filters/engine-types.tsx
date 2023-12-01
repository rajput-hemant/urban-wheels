import type { Dispatch, SetStateAction } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { EngineType } from "@/lib/enums";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { SelectedFilters } from "../filters";

const engineTypes = [
  { slug: EngineType.GAS, name: "Gas" },
  { slug: EngineType.HYBRID, name: "Hybrid" },
  { slug: EngineType.ELECTRIC, name: "Electric" },
];

type EngineTypeFiltersProps = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

export function EngineTypeFilters(props: EngineTypeFiltersProps) {
  const { selectedFilters, setSelectedFilters } = props;

  const toggleEngineType = (engineType: EngineType, checked: CheckedState) => {
    setSelectedFilters((filters) => {
      const engineTypes = checked
        ? [...filters.engineTypes, engineType]
        : filters.engineTypes.filter((et) => et !== engineType);

      return { ...filters, engineTypes };
    });
  };

  return (
    <section>
      <h3 className="pb-6 text-xl font-semibold">Engine type</h3>

      <div className="grid grid-cols-2 items-center">
        {engineTypes.map(({ slug, name }) => (
          <div key={slug} className="flex items-center py-2">
            <Checkbox
              id={slug}
              checked={selectedFilters.engineTypes.includes(slug)}
              onCheckedChange={(checked) => toggleEngineType(slug, checked)}
              className="h-6 w-6 rounded-md"
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
