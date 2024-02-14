"use client";

import React from "react";

import { cn, setCSSVariable } from "@/lib/utils";
import { Icons } from "./icons";

type LogoData = {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  height: string;
};

const logoHeights: Record<string, string> = {
  volvo: "17px",
  suvaru: "52px",
  jeep: "28px",
  porsche: "36px",
  volkswagen: "40px",
  toyota: "40px",
  bmw: "46px",
  honda: "32px",
  audi: "32px",
  mini: "40px",
  ford: "48px",
  tesla: "18px",
  nissan: "46px",
  kia: "18px",
  hyundai: "18px",
  mercedesBenz: "42px",
};

const initialLogos: LogoData[] = Object.keys(logoHeights).map((id) => ({
  id,
  icon: Icons[id as keyof typeof Icons],
  height: logoHeights[id],
}));

export function LogoSlider() {
  const LOGO_WIDTH = "10rem";
  const TOTAL_SETS_TO_CLONE = 2;

  const logosListRef = React.useRef<HTMLUListElement>(null);

  const [isSliderInitialized, setIsSliderInitialized] = React.useState(false);
  const [clonedLogos, setClonedLogos] = React.useState<LogoData[]>([]);

  React.useEffect(() => {
    const logoList = logosListRef.current;
    const logoElements = logoList?.querySelectorAll<HTMLLIElement>("li");

    if (logoList && logoElements) {
      const totalLogos = logoElements.length;
      setCSSVariable("--slider-total-logos", totalLogos.toString());
      setCSSVariable("--slider-logo-width", LOGO_WIDTH);
      setCSSVariable(
        "--slider-total-logo-width",
        `calc(
             var(--slider-total-logos) * var(--slider-logo-width) * (${TOTAL_SETS_TO_CLONE} + 1)
          )`
      );

      setIsSliderInitialized(true);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (isSliderInitialized) {
      setClonedLogos(generateClonedLogos(initialLogos, TOTAL_SETS_TO_CLONE));
    }
  }, [isSliderInitialized]);

  const generateClonedLogos = (
    logos: LogoData[],
    totalSets: number
  ): LogoData[] => {
    const clonedLogos: LogoData[] = [];
    for (let set = 1; set <= totalSets; set++) {
      logos.forEach(({ id, icon, height }) => {
        const clonedId = `cloned-logos-${set}-${id}`;
        clonedLogos.push({ id: clonedId, icon, height });
      });
    }
    return clonedLogos;

    // return Array.from({ length: totalSets }, (_, set) =>
    //   logos.map(({ id, icon, height }) => ({
    //     id: `logo-clone-${set + 1}-${id}`,
    //     icon,
    //     height,
    //   }))
    // ).flat();
  };

  return (
    <div
      className={cn(
        "relative flex h-32 w-screen items-center overflow-hidden whitespace-nowrap",
        "before:from-muted before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r md:before:w-96",
        "after:from-muted after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l md:after:w-96"
      )}
    >
      <div
        className={cn(
          "h-12 transition-opacity",
          clonedLogos.length > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        <ul
          ref={logosListRef}
          className="animate-slide flex w-[var(--slider-total-logo-width)] items-center opacity-60 grayscale"
        >
          {initialLogos.map(({ id, icon: Icon, height }) => (
            <li
              key={id}
              id={id}
              className="mx-5 inline-flex w-[var(--slider-logo-width)] items-center justify-center"
            >
              <Icon style={{ height }} />
            </li>
          ))}

          {clonedLogos.map(({ id, icon: Icon, height }) => (
            <li
              key={id}
              id={id}
              className="mx-5 inline-flex w-[var(--slider-logo-width)] items-center justify-center"
            >
              <Icon style={{ height }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
