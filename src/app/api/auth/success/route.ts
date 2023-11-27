import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getUserAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";

export async function GET(req: NextRequest) {
  const user = await getUserAuth();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));

  if (!dbUser) {
    await db.insert(users).values({
      id: user.id,
      name: user.name,
      email: user.email!,
      image: user.image,
    });
  }

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
