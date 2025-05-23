import z from "zod";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";

import { createAuthCookie } from "../auth-utils";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.payload.auth({ headers });

    return session;
  }),

  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(1, { message: "password field should not be empty" })
          .max(15, { message: "Password too long" }),
        username: z
          .string()
          .min(3, "username needs to be at least 3 characters long")
          .max(265, "username too long")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "username can only contain lower letter, numbers and hyphens. It must start and end with a number or a character"
          )
          .refine(
            (val) => !val.includes("--"),
            "username must not contain consecutive hyphens"
          )
          .transform((val) => val.toLowerCase()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.payload.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];
      if (existingUser)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "username already taken",
        });

      const tenant = await ctx.payload.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: "mock",
        },
      });

      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
          username: input.username,
          tenants: [
            {
              tenant: tenant.id,
            },
          ],
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Login failed" });
      }

      await createAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().max(15, { message: "Password too long" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Login failed" });
      }

      await createAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),
});
