import { db, postToJSON } from "../lib/firebase";

const getUserById = async (id) => {
  const userRef = db.collection("users").doc(id);
  const getUserRef = await userRef.get();

  const userDoc = postToJSON(getUserRef);

  return {
    id: getUserRef.id,
    ...userDoc,
  };
};

const getUserPosts = async (id) => {
  const postsRef = db.collection("posts");
  const query = await postsRef.where("uid", "==", id).get();
  const posts = query.docs.map((post) => {
    const postDoc = postToJSON(post);
    return {
      id: post.id,
      ...postDoc,
    };
  });

  return posts;
};

export const UserService = {
  getUserById,
  getUserPosts,
};
