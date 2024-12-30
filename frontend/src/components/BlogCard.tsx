import formatDate from "../utils/formatDate";
import Avatar from "./Avatar";

import { GoDotFill } from "react-icons/go";

interface BlogCardProps {
  title: string;

  content: string;

  username: string;

  createdAt: string;
}

const BlogCard = ({ title, content, username, createdAt }: BlogCardProps) => {
  const contentWords = content.split(" ");

  const extractedWords = contentWords.slice(
    0,
    Math.min(50, contentWords.length)
  );

  const blogCardContent = extractedWords.join(" ");

  console.log(blogCardContent);

  return (
    <div className="max-w-[75%] mx-auto border-b-2 border-solid border-slate-200 py-4 flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Avatar name={username} />
        <span className="text-slate-600 font-semibold text-xl">{username}</span>
        <GoDotFill color="#475569" />
        <span className="text-slate-400 text-sm">{formatDate(createdAt)}</span>
      </div>

      <h1 className="text-4xl font-bold text-slate-800">{title}</h1>

      <div className="text-2xl text-slate-500 font-semibold">
        {blogCardContent}
        {contentWords.length > 50 ? "..." : ""}
      </div>
      <div className="text-slate-500">
        {Math.ceil(content.length / 100)} minute(s) read
      </div>
    </div>
  );
};

export default BlogCard;
