import React from "react";
import UserProfile from "../../components/UserProfile";
import { UserService } from "../../services/user-service";
import PostList from "../../components/PostList";
import MetaTags from "../../components/MetaTags";

const UserPage = ({ user, posts }) => {
  return (
    <div className="container mt-5">
      <MetaTags title={user.displayName} />
      <UserProfile user={user} />
      <div className="my-3">
        <h2> Posts </h2>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="alert alert-info">
            This user doesn't have a post yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;

export async function getServerSideProps({ query }) {
  const { id } = query;

  const user = await UserService.getUserById(id);

  if (!user) {
    return {
      notFound: true,
    };
  }

  const posts = await UserService.getUserPosts(id);

  return {
    props: {
      user,
      posts,
    },
  };
}
