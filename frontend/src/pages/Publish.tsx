import Appbar from "../components/AppBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextEditor from "../components/TextEditor";

import useCreateBlog from "../hooks/useCreateBlog";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, isError } = useCreateBlog();

  function handleSubmit(e) {
    e.preventDefault();

    mutate({
      title,
      content,
      published: true,
    });
  }

  return (
    <div>
      <Appbar publishPage={true} />
      <div className="flex justify-center w-full pt-8">
        <form onSubmit={handleSubmit} className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
