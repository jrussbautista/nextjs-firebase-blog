import React from "react";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <Link href={`/post/${post.slug}`}>
          <a>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
