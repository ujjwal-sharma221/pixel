import { cookies as getCookies } from "next/headers";

interface CreateCookieValues {
  prefix: string;
  value: string;
}

export async function createAuthCookie({ prefix, value }: CreateCookieValues) {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
  });
}
