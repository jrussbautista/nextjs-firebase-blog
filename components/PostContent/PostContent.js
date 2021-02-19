import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import formatDate from "../../utils/formatDate";

const PostContent = ({ post }) => {
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
      </div>
    </div>
  );
};

export default PostContent;
