/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const runtime = "edge";

async function fetchImage() {
  const res = await fetch(
    new URL("../../../public/images/screenshot-dark.png", import.meta.url)
  );
  const buffer = await res.arrayBuffer();
  return buffer;
}

async function fetchFonts() {
  const res = await fetch(
    new URL("../../../public/fonts/CalSans-SemiBold.woff", import.meta.url)
  );

  const buffer = await res.arrayBuffer();

  return buffer;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) ?? siteConfig.name;
  const description =
    searchParams.get("description")?.slice(0, 300) ??
    "Open source app built with Next.js (app router), Server Components, Server Action, Supabase & Drizzle, TailwindCSS & more...";

  const image = await fetchImage();
  const font = await fetchFonts();

  try {
    const mode = (searchParams.get("mode") as "light" | "dark") ?? "dark";

    return new ImageResponse(
      (
        <div
          tw={cn(
            "relative flex h-full bg-white text-black",
            mode === "dark" && "bg-black text-white"
          )}
        >
          {mode === "dark" && (
            <svg
              viewBox="0 0 1024 1024"
              style={{
                transform: "translateX(-50%)",
                maskImage: "radial-gradient(closest-side,white,transparent)",
              }}
              // @ts-ignore
              tw="absolute left-1/2 top-1/2 ml-0 h-[64rem] w-[64rem]"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset="1" stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          )}

          <div tw="flex h-full w-1/2 flex-col justify-between px-12 py-24">
            <header tw="flex flex-col">
              <h1 tw="flex items-center text-4xl">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  // @ts-ignore
                  tw="mt-1.5 mr-1 h-10 w-10"
                >
                  <path
                    d="M25.7175 9.71835L16.78 4.82811C16.5412 4.69617 16.2728 4.62695 16 4.62695C15.7272 4.62695 15.4588 4.69617 15.22 4.82811L6.2825 9.72038C6.02726 9.86003 5.8142 10.0657 5.66556 10.3158C5.51692 10.5659 5.43816 10.8513 5.4375 11.1423V20.8557C5.43816 21.1466 5.51692 21.4321 5.66556 21.6822C5.8142 21.9323 6.02726 22.1379 6.2825 22.2776L15.22 27.1698C15.4588 27.3018 15.7272 27.371 16 27.371C16.2728 27.371 16.5412 27.3018 16.78 27.1698L25.7175 22.2776C25.9727 22.1379 26.1858 21.9323 26.3344 21.6822C26.4831 21.4321 26.5618 21.1466 26.5625 20.8557V11.1433C26.5624 10.8518 26.4839 10.5657 26.3352 10.315C26.1865 10.0643 25.9732 9.85825 25.7175 9.71835ZM16 20.0625C15.1965 20.0625 14.4111 19.8242 13.743 19.3778C13.0749 18.9314 12.5542 18.297 12.2467 17.5546C11.9393 16.8123 11.8588 15.9955 12.0156 15.2074C12.1723 14.4194 12.5592 13.6955 13.1274 13.1274C13.6955 12.5592 14.4194 12.1723 15.2074 12.0155C15.9955 11.8588 16.8123 11.9392 17.5547 12.2467C18.297 12.5542 18.9315 13.0749 19.3778 13.743C19.8242 14.4111 20.0625 15.1965 20.0625 16C20.0625 17.0774 19.6345 18.1107 18.8726 18.8726C18.1108 19.6345 17.0774 20.0625 16 20.0625Z"
                    fill="currentColor"
                  />
                </svg>
                {title}
              </h1>

              <p tw="text-3xl font-medium">{description}</p>
            </header>

            <div tw="text-lg font-medium">
              {siteConfig.links.github.replace("https://", "")}
            </div>
          </div>

          <div tw="relative flex h-full w-1/2 overflow-hidden">
            <img
              // @ts-ignore
              src={image}
              tw={cn(
                "mx-8 my-auto w-[56rem] max-w-none rounded-2xl border border-gray-200 shadow-xl",
                mode === "dark" && "border-zinc-800"
              )}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "heading",
            data: font,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log((e as Error).message);

    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
