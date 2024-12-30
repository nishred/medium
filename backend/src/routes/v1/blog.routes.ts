import { Hono, Context } from "hono";

import { verify } from "hono/jwt";
import auth from "../../middlewares/auth";
import {
  createBlog,
  deleteBlog,
  fetchBlog,
  fetchBlogs,
  updateBlog,
} from "../../controllers/blog.controller";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

blogRouter.get("/bulk", fetchBlogs);
blogRouter.use("/*", auth);
blogRouter.get("/:id", fetchBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);

blogRouter.post("/", createBlog);

export default blogRouter;
