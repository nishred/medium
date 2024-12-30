import { Hono } from "hono";

import { Context } from "hono";

import { sign } from "hono/jwt";
import { me, signIn, signUp } from "../../controllers/user.controller";
import auth from "../../middlewares/auth";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

userRouter.use("/me", auth);

userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

userRouter.get("/me", me);

export default userRouter;
