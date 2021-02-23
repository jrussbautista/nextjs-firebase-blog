import React, { useState } from "react";
import withAuth from "../lib/withAuth";
import CreatePostForm from "../components/CreatePostForm";
import { PostService } from "../services/post-service";
import toast from "react-hot-toast";
import Router from "next/router";

const CreatePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    try {
      setIsSubmitting(true);
      const results = await PostService.createPost(value);
      toast.success("You've successfully created your post.");
      const url = `/post/${results.slug}`;
      Router.push(url);
    } catch (error) {
      toast.error(
        "Sorry! We've unable to create your post. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h1> Create Post</h1>
      <CreatePostForm submit={handleSubmit} loading={isSubmitting} />
    </div>
  );
};

export default withAuth(CreatePage);
