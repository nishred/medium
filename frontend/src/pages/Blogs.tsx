import useBlogs from "../hooks/useBlogs";

import BlogCard from "../components/BlogCard";
import BlogsSkeleton from "../components/BlogsSkeleton";
import AppBar from "../components/AppBar";

const Blogs = () => {
  const { blogs, isLoading, isError, error } = useBlogs();

  if (isError) return <div>{error?.message || "Something went wrong"}</div>;

  return (
    <div>
      <AppBar publishPage={false} />

      <div className="flex flex-col gap-8 py-4">
        {!isLoading &&
          blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                username={blog.author.name}
              />
            );
          })}
        {isLoading && <BlogsSkeleton />}
      </div>
    </div>
  );
};

export default Blogs;
