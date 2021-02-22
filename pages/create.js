import React from "react";
import withAuth from "../lib/withAuth";
import CreatePostForm from "../components/CreatePostForm";

const CreatePage = () => {
  return (
    <div className="container my-5">
      <h1> Create Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default withAuth(CreatePage);
