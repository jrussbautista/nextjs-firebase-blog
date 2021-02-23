import React from "react";
import PostContent from "../../components/PostContent";
import MetaTags from "../../components/MetaTags";
import { PostService } from "../../services/post-service";

const PostPage = ({ post }) => {
  return (
    <div className="container">
      <MetaTags title={post.title} />
      <PostContent post={post} />
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
