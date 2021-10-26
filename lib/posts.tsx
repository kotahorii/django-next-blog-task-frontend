import fetch from "node-fetch";
import { Post } from "../types";

export const getAllPostsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`
  );
  const posts = (await res.json()) as Post[];
  const filteredPosts = posts.sort((a, b): number => {
    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
  });
  return filteredPosts;
};
