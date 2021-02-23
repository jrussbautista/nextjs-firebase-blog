import { auth, db, increment, serverTimestamp } from "../lib/firebase";

const checkFavoritedPost = async (postId) => {
  const { currentUser } = auth;

  const favoritesRef = db
    .collection("favorites")
    .where("postId", "==", postId)
    .where("userId", "==", currentUser.uid);
  const getFavoritesRef = await favoritesRef.get();

  if (!getFavoritesRef.empty) {
    const id = getFavoritesRef.docs[0].id;
    return { id };
  } else {
    return false;
  }
};

const toggleFavorite = async (postId) => {
  const { currentUser } = auth;

  const result = await checkFavoritedPost(postId);

  const batch = db.batch();

  const postsRef = db.collection("posts").doc(postId);
  const favoritesRef = result
    ? db.collection("favorites").doc(result.id)
    : db.collection("favorites").doc();

  if (result) {
    batch.update(postsRef, {
      heartCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
    batch.delete(favoritesRef);
  } else {
    batch.update(postsRef, {
      heartCount: increment(1),
      updatedAt: serverTimestamp(),
    });
    batch.set(favoritesRef, { userId: currentUser.uid, postId });
  }

  return batch.commit();
};

export const FavoriteService = {
  toggleFavorite,
  checkFavoritedPost,
};
