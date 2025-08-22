"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
});

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password is required"),
});

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  // Validate form data
  const validatedFields = signUpSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  const { email, password, name } = validatedFields.data;

  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if ((data.user && data.user.identities && data.user.identities.length === 0) || existingUser) {
    return {
      error: "User with this email already exists",
    };
  }

  if (data.user) {
    try {
      await prisma.user.create({
        data: {
          email: data.user.email!,
          name,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return {
        error: "Failed to save user data",
      };
    }
  }

  redirect("/");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate form data
  const validatedFields = signInSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
