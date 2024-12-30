import useBlogs from "../hooks/useBlogs";

import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const { blogs, isLoading, isError, error } = useBlogs();

  if (isLoading) return <div>loading..</div>;

  if (isError) return <div>{error.message}</div>;


  return (
    <div>
      <AppBar />

      <div className="flex flex-col gap-8 py-4">
        {blogs.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
              username={blog.author.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
