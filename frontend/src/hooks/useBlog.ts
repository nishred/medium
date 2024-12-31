import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "../api/blogs";

function useBlog(id: string) {
  const token = window.localStorage.getItem("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      return await fetchBlog(id, token);
    },
  });

  return { blog: data, isLoading, isError, error };
}

export default useBlog;
