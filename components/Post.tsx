import React, { VFC } from "react";
import { ReadPost } from "../types";

type Props = {
  post: ReadPost;
};
const Post: VFC<Props> = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
        {post.title}
      </span>
    </div>
  );
};

export default Post;
