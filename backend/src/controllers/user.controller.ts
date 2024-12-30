import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";

import auth from "../middlewares/auth";

import { signInInput, signUpInput } from "@nishanthredde/medium-common";

const signUp = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await ctx.req.json();

  try {
    const parsedBody = signUpInput.parse(body);

    const user = await prisma.user.create({
      data: {
        email: parsedBody.email,
        name: parsedBody.name,
        password: parsedBody.password,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      ctx.env.JWT_SECRET
    );

    return ctx.json({
      message: "user created successfully",
      data: {
        token: jwt,
      },
    });
  } catch (err) {
    ctx.status(400);

    return ctx.json({
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

const signIn = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await ctx.req.json();

  try {
    const parsedBody = signInInput.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (!user)
      return ctx.json({
        error: "Email invalid",
      });

    if (parsedBody.password !== user.password)
      return ctx.json({
        error: "Wrong password",
      });

    const token = await sign(
      {
        id: user.id,
      },
      ctx.env.JWT_SECRET
    );

    return ctx.json({
      message: "Sign in successfull",
      data: {
        token,
      },
    });
  } catch (err: any) {
    ctx.status(400);

    return ctx.json({
      success: false,
      error: err.message ? err.message : "something went wrong",
    });
  }
};

const me = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = ctx.get("userId");

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return ctx.json({
      success: true,
      message: "user details",
      data: {
        user,
      },
    });
  } catch (err) {
    ctx.status(400);

    return ctx.json({
      success: false,

      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

export { signIn, signUp, me };
