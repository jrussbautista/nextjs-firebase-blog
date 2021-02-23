import React from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <Link href={`/post/${post.slug}`}>
          <a>
            <h3>{post.title}</h3>
          </a>
        </Link>
        <div>{formatDate(post.createdAt)}</div>
        <p>
          {post.heartCount} <i className="bi bi-heart-fill text-danger"></i>
          <span> people like this</span>
        </p>
        <div>
          <Link href={`/user/${post.user.uid}`}>
            <a>
              <img
                src={post.user.photoURL}
                alt={post.user.displayName}
                width="30"
                className="rounded-circle mr-3"
              />
              <span> {post.user.displayName}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
