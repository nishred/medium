import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBlog() {
  const token = window.localStorage.getItem("token");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async ({
      title,
      content,
      published,
    }: {
      title: string;
      content: string;
      published: boolean;
    }) => {
      return await createBlog(
        {
          title,
          content,
          published,
        },
        token as string
      );
    },
    onSuccess: (data) => {
      navigate(`/blog/${data.blog.id}`);
      toast.success("Blog posted successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { mutate, isLoading, isError };
}

export default useCreateBlog;
