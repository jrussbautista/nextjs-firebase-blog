import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import formatDate from "../../utils/formatDate";
import HeartButton from "../HeartButton";

const PostContent = ({ post, isFavorite, onToggleFavorite }) => {
  return (
    <div className="card my-5">
      <div className="card-body">
        <h1 className="mb-3">{post.title}</h1>
        <span>
          Written by:
          <Link href={`/user/${post.user.id}`}>
            <a> {post.user.name} </a>
          </Link>
          <span>on {formatDate(post.createdAt)}</span>
        </span>
        <ReactMarkdown className="my-3">{post.content}</ReactMarkdown>
        <div className="mb-2">{post.heartCount} people love this.</div>
        <div>
          <HeartButton fill={isFavorite} onClick={onToggleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
