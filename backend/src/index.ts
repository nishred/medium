import { Hono } from "hono";

import apiRouter from "./routes";
import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

// const prisma = new PrismaClient({
//   datasourceUrl: env.DATABASE_URL,
// }).$extends(withAccelerate());

app.use("/api/*", cors());

app.route("/api", apiRouter);

app.get("/", (c: Context) => {
  return c.text("Hello Hono!");
});

export default app;
