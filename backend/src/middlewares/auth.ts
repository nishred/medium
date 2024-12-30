import { Context, Next } from "hono";
import { verify } from "hono/jwt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const auth = async (ctx: Context, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const token = ctx.req.header("Authorization")?.startsWith("Bearer")
    ? ctx.req.header("Authorization")?.split(" ")[1]
    : null;

  try {
    if (!token) throw new Error("Please login");

    const decodedPayload = await verify(token, ctx.env.JWT_SECRET);

    const exp = decodedPayload.exp;

    const seconds = (exp as number) - Math.ceil(Date.now() / 1000);

    if (seconds <= 0) throw new Error("Please login again");

    const userId: string = decodedPayload.id as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    ctx.set("userId", String(userId));

    await next();
  } catch (err) {
    ctx.status(400);
    return ctx.json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export default auth;
