import { createRouter } from "./context";
import { z } from "zod";
import { resolve } from "path";
import { getSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { TRPCError } from "@trpc/server";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .query("restricted", {
    async resolve({ ctx }) {
      const { req, res } = ctx;
      const session = await getSession({ req });

      // if no session, return unauthorized error
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You must be signed in to view the protected content on this page.",
        });
      }

      // return protected content
      return {
        content:
          "This is protected content. You can access this content because you are signed in.",
      };
    },
  });
