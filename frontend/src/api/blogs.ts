import { BACKEND_URL } from "../utils/constants";

import axios from "axios";

async function fetchBlogs(token: string | null) {
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const blogs = response.data.data.blogs;

  return blogs;
}

async function fetchBlog(id, token) {
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const blog = response.data.data.blog;

  return blog;
}

async function createBlog(
  {
    title,
    content,
    published,
  }: {
    title: string;
    content: string;
    published: boolean;
  },
  token: string
) {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/blog`,
    {
      title,
      content,
      published,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export { fetchBlogs, fetchBlog, createBlog };
