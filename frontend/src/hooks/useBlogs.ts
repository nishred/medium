import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/blogs";

function useBlogs() {
  const token = window.localStorage.getItem("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await fetchBlogs(token);
    },
  });

  return { blogs: data, isLoading, isError, error };
}

export default useBlogs;
