import { useState } from "react";
import { fromMillis } from "../lib/firebase";
import { PostService } from "../services/post-service";
import PostList from "../components/PostList";
import toast from "react-hot-toast";

export default function Home({ posts: currentPosts }) {
  const [posts, setPosts] = useState(currentPosts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPostsEnd, setIsPostsEnd] = useState(false);

  const isLoadMoreButtonVisible = !isLoadingMore && !isPostsEnd;

  const getMorePosts = async () => {
    try {
      setIsLoadingMore(true);
      const lastVisible = posts[posts.length - 1];
      const cursor =
        typeof lastVisible.createdAt === "number"
          ? fromMillis(lastVisible.createdAt)
          : lastVisible.createdAt;

      const { data, isReachedEnd } = await PostService.getMorePosts(cursor);
      setPosts(posts.concat(data));

      if (isReachedEnd) {
        setIsPostsEnd(isReachedEnd);
      }
    } catch (error) {
      toast.error("Unable to load more posts. Please try again later");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="container my-4">
      <h1> Recent Posts </h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="alert alert-info">No posts yet.</div>
      )}

      {isLoadMoreButtonVisible && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={getMorePosts}
          >
            Load More
          </button>
        </div>
      )}

      {isLoadingMore && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary " role="status"></div>
        </div>
      )}

      {isPostsEnd && (
        <div className="alert alert-info"> You have reached the end. </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await PostService.getPosts();

  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}
