import React, { useState, useEffect } from "react";
import PostContent from "../../components/PostContent";
import MetaTags from "../../components/MetaTags";
import { PostService } from "../../services/post-service";
import { FavoriteService } from "../../services/favorite-service";
import { useAuth } from "../../contexts/auth/useAuth";
import toast from "react-hot-toast";

const PostPage = ({ post: currentPost }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const [post, setPost] = useState(currentPost);

  const actionType = isFavorite ? "removed" : "added";

  useEffect(() => {
    const checkFavoritedPost = async () => {
      try {
        const result = await FavoriteService.checkFavoritedPost(post.id);
        setIsFavorite(result);
      } catch (error) {
        setIsFavorite(false);
      }
    };

    if (user) {
      checkFavoritedPost();
    }
  }, [user]);

  const handleToggleFavorite = async () => {
    try {
      await FavoriteService.toggleFavorite(post.id);
      setIsFavorite(!isFavorite);
      const heartCount = isFavorite ? post.heartCount - 1 : post.heartCount + 1;
      setPost({ ...post, heartCount });
      toast.success(
        `You've successfully ${actionType} this post to your favorite`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Sorry! We were not able to ${actionType} this post to your favorite.`
      );
    }
  };

  return (
    <div className="container">
      <MetaTags title={post.title} />
      <PostContent
        post={post}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default PostPage;

export async function getStaticProps({ params }) {
  const { slug } = params;

  let post;

  try {
    post = await PostService.getPostBySlug(slug);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    }, // will be passed to the page component as props
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const paths = await PostService.getAllPosts();

  return {
    paths,
    fallback: "blocking",
  };
}
