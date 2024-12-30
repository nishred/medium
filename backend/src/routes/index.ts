import { Hono } from "hono";
import v1Router from "./v1";

const apiRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

apiRouter.route("/v1", v1Router);

export default apiRouter;
