import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/types";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      name: true,
      avatarUrl: true,
      email: true,
    },
  });

  const finalUser = {
    name: dbUser?.name || user.user_metadata?.name || null,
    email: dbUser?.email && dbUser.email === user.email ? dbUser.email : null,
    avartarUrl: dbUser?.avatarUrl || user.user_metadata?.avatar_url || null,
  };

  if (
    typeof finalUser.name === "string" &&
    typeof finalUser.email === "string"
  ) {
    return finalUser as UserType;
  }

  return null;
}
