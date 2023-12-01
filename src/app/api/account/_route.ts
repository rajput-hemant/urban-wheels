// import { revalidatePath } from "next/cache";

// import { getUserAuth } from "@/lib/auth";
// import { db } from "@/lib/db/index";
// import { users } from "@/lib/db/schema/auth";

// export async function PUT(request: Request) {
//   const { session } = await getUserAuth();
//   if (!session) return new Response("Error", { status: 400 });
//   const body = (await request.json()) as { name?: string; email?: string };

//   await db.update(users).set({ ...body });
//   revalidatePath("/account");
//   return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
// }
