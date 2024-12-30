import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();

  return <div>blog</div>;
};

export default Blog;
