import fetch from "node-fetch";
import { ReadPost } from "../types";

export const getAllPostsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = (await res.json()) as ReadPost[];
  const filteredPosts = posts.sort((a, b): number => {
    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
  });
  return filteredPosts;
};

export const getAllPostsIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = (await res.json()) as ReadPost[];
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
  );
  const post = await res.json();
  return post;
};
