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

export { fetchBlogs };
