import fetch from "node-fetch";

export async function getAllPostsData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = await res.json();
  const filteredPosts = posts;
  return filteredPosts;
}

export async function getAllPostIds() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = (await res.json()) as any;
  return posts.map((post: any) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
  );
  const post = await res.json();
  // return {
  //   post,
  // };
  return post;
}
