"use server";

import { cookies } from "next/headers";
import { login, register as registerUser } from "@/services/reqres";
import { createUser, getUserByEmail } from "@/lib/user-repository";

export async function loginAction(email: string, password: string) {
  try {
    console.log(`Attempting login for: ${email}`);
    const res = await login(email, password);
    console.log("Login successful, setting cookie");
    try {
      const existingUser = await getUserByEmail(email);
      if (!existingUser) {
        await createUser({ email });
        console.log("User saved to database");
      }
    } catch (dbError) {
      console.error("Error saving user to database:", dbError);
    }
    const cookieStore = await cookies();
    cookieStore.set("session_token", res.token, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { success: true };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Login failed" };
  }
}

export async function signupAction(email: string, password: string) {
  try {
    console.log(`Attempting signup for: ${email}`);
    const res = await registerUser(email, password);
    console.log("Registration successful, setting cookie");
    
    try {
      await createUser({ email });
      console.log("User saved to database");
    } catch (dbError) {
      console.error("Error saving user to database:", dbError);
    }
    
    const cookieStore = await cookies();
    cookieStore.set("session_token", res.token, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { success: true };
  } catch (error) {
    console.error("Signup action error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Registration failed" };
  }
}
