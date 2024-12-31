import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { Auth } from "hono/utils/basic-auth";

import { createBlogInput, updateBlogInput } from "@nishanthredde/medium-common";

const createBlog = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await ctx.req.json();

  const authorId = ctx.get("userId");

  console.log("body", body);

  console.log("Author Id", authorId);

  try {
    const parsedBody = createBlogInput.parse(body);

    const blog = await prisma.post.create({
      data: {
        ...parsedBody,
        author: {
          connect: { id: ctx.get("userId") },
        },
      },
    });

    return ctx.json({
      success: true,
      message: "Blog has been posted",
      data: { blog: blog },
    });
  } catch (err) {
    ctx.status(400);

    return ctx.json({
      success: false,
      error: err instanceof Error ? err.message : "something went wrong",
    });
  }
};

const fetchBlog = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: ctx.req.param("id"),
      },

      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) throw new Error("invalid id");

    return ctx.json({
      success: true,
      message: "Blog fetched successfully",
      data: {
        blog,
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

const fetchBlogs = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return ctx.json({
      success: true,
      data: {
        blogs,
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

const updateBlog = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await ctx.req.json();

    const parsedBody = updateBlogInput.parse(body);

    const updatedBlog = await prisma.post.update({
      where: {
        id: ctx.req.param("id"),
      },

      data: {
        ...parsedBody,
      },
    });

    return ctx.json({
      success: true,
      message: "Blog updated successfully",
      data: {
        blog: updatedBlog,
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

const deleteBlog = async (ctx: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: ctx.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = ctx.req.param("id");

    const blog = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!blog) throw new Error("Invalid id");

    return ctx.json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (err) {
    ctx.status(400);

    return ctx.json({
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

export { createBlog, updateBlog, fetchBlog, fetchBlogs, deleteBlog };
