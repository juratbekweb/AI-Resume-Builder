import type { AuthOptions } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {},
} satisfies AuthOptions;
