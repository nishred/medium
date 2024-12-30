import { Hono } from "hono";

import userRouter from "./user.routes";

import blogRouter from "./blog.routes";

const v1Router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

v1Router.route("/user", userRouter);

v1Router.route("/blog", blogRouter);

export default v1Router;
