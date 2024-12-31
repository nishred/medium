import { Form, useParams } from "react-router-dom";
import useBlog from "../hooks/useBlog";

import formatDate from "../utils/formatDate";

import styled from "styled-components";
import Avatar from "../components/Avatar";
import AppBar from "../components/AppBar";

const StyledBlog = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 4);
  padding: 64px;
  column-gap: 2rem;
`;

const Blog = () => {
  const { id } = useParams();

  const { blog, isLoading, isError, error } = useBlog(id as string);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <AppBar publishPage={false} />
      <StyledBlog>
        <div className="col-start-1 col-end-4 flex flex-col gap-4">
          <h1 className="text-5xl text-slate-900 font-bold">{blog.title}</h1>

          <div className="text-slate-400">
            posted on {formatDate(blog.createdAt)}
          </div>

          <div className="text-2xl text-slate-500 font-semibold">
            {blog.content}
          </div>
        </div>

        <div className="col-start-4 col-end-5 flex flex-col gap-4">
          <h1 className="text-xl font-semibold text-slate-800">Author</h1>
          <div className="flex gap-2 items-center">
            <Avatar name={blog.author.name} />

            <h1 className="text-2xl font-bold text-slate-800">
              {blog.author.name}
            </h1>
          </div>
        </div>
      </StyledBlog>
    </>
  );
};

export default Blog;
