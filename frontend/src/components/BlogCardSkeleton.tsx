import { GoDotFill } from "react-icons/go";
import Avatar from "./Avatar";

const BlogCardSkeleton = () => {
  return (
    <div className="w-[75%] mx-auto border-b-2 border-solid border-slate-200 py-4 flex flex-col gap-3 animate-pulse">
      <div className="flex gap-2 items-center">
        <Avatar />
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <GoDotFill color="#475569" />
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>

      <h1 className="h-2 bg-gray-200 rounded-full mb-2.5"></h1>

      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
  );
};

export default BlogCardSkeleton;
