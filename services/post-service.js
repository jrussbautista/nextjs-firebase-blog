import { db, postToJSON } from "../lib/firebase";

const LIMIT = 10;

const getAllPosts = async () => {
  const postsRef = db.collection("posts");
  const getPostsRef = await postsRef.get();

  const paths = getPostsRef.docs.map((path) => {
    const { slug } = path.data();
    return {
      params: { slug },
    };
  });

  return paths;
};

const getPostBySlug = async (slug) => {
  const postsRef = db.collection("posts").where("slug", "==", slug);
  const getPostsRef = await postsRef.get();

  if (getPostsRef.empty) {
    throw new Error("Post not found");
  }

  const post = getPostsRef.docs[0];
  const postData = postToJSON(post);

  return {
    id: post.id,
    ...postData,
  };
};

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
  getPostBySlug,
  getAllPosts,
};
