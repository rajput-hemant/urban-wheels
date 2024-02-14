import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

export const getUserAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return {
      id: user.id,
      name: `${user.given_name} ${user.family_name ?? ""}`.trim(),
      email: user.email,
      image: user.picture,
    } satisfies User;
  } else {
    return null;
  }
};

export const checkAuth = async () => {
  const user = await getUserAuth();

  if (user === null) redirect("/api/auth/login");
};
