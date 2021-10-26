import React, { VFC } from "react";
import { ReadPost } from "../types";
import Link from "next/link";

type Props = {
  post: ReadPost;
};
const Post: VFC<Props> = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/posts/${post.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.title}
        </span>
      </Link>
    </div>
  );
};

export default Post;
