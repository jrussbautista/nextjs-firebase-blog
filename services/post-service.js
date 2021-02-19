import { db, postToJSON } from "../lib/firebase";

const LIMIT = 10;

const getPosts = async () => {
  const postsRef = db
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  const getPostsRef = await postsRef.get();
  const posts = getPostsRef.docs.map((post) => {
    const postDoc = postToJSON(post);
    return {
      id: post.id,
      ...postDoc,
    };
  });

  return posts;
};

const getMorePosts = async (cursor) => {
  let isReachedEnd = false;

  const postsRef = db
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .startAfter(cursor)
    .limit(LIMIT);

  const getPostsRef = await postsRef.get();
  const posts = getPostsRef.docs.map((post) => {
    const postDoc = postToJSON(post);
    return {
      id: post.id,
      ...postDoc,
    };
  });

  if (posts.length < LIMIT) {
    isReachedEnd = true;
  }

  return {
    data: posts,
    isReachedEnd,
  };
};

export const PostService = {
  getPosts,
  getMorePosts,
};
