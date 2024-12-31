import { StyledBlog } from "../pages/Blog";
import Avatar from "./Avatar";

const BlogPageSkeleton = () => {
  return (
    <>
      <StyledBlog>
        <div className="col-start-1 col-end-4 flex flex-col gap-4">
          <h1 className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></h1>

          <div className="h-[600px] bg-gray-200 rounded-sm mb-2.5"></div>

          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>

        <div className="col-start-4 col-end-5 flex flex-col gap-4">
          <h1 className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></h1>
          <div className="flex gap-2 items-center">
            <Avatar />

            <h1 className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></h1>
          </div>
        </div>
      </StyledBlog>
    </>
  );
};

export default BlogPageSkeleton;
