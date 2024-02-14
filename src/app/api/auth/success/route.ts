import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import type { NextRequest } from "next/server";

import { getUserAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";

export async function GET(req: NextRequest) {
  const user = await getUserAuth();

  // TODO: at build time, user is null
  // if (!user || user == null || !user.id)
  //   return NextResponse.redirect(new URL("/", req.nextUrl));

  if (user !== null && user.id) {
    const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));

    if (!dbUser) {
      await db.insert(users).values({
        id: user.id,
        name: user.name,
        email: user.email!,
        image: user.image,
      });
    }
  }

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
