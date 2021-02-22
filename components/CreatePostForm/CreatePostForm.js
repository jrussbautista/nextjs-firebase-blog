import React, { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "../../utils/slugify";
import ReactMarkdown from "react-markdown";

const CreatePostForm = ({ submit }) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      title: "",
      published: false,
      content: "",
    },
  });

  const slug = slugify(watch("title"));

  const onSubmit = (data) => {
    submit(data);
  };

  const togglePreview = () => {
    setIsOpenPreview(!isOpenPreview);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          id="title"
          name="title"
          placeholder="Input title here"
          ref={register({
            required: "Title is required field",
            minLength: {
              value: 6,
              message: "Title must be at least 6 characters long",
            },
          })}
        />
        {errors.title && (
          <p className="invalid-feedback">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="slug" className="form-label">
          Slug
        </label>
        <input
          type="text"
          className="form-control"
          id="slug"
          name="slug"
          placeholder="Slug will automatically generated here..."
          disabled
          value={slug}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          className={`form-control ${errors.content ? "is-invalid" : ""}`}
          id=""
          cols="30"
          rows="10"
          ref={register({
            maxLength: { value: 20000, message: "Content is too long" },
            minLength: { value: 10, message: "Content is too short" },
            required: { value: true, message: "Content is required field" },
          })}
        ></textarea>
        {errors.content && (
          <p className="invalid-feedback">{errors.content.message}</p>
        )}

        {watch("content") && (
          <div className="d-flex justify-end">
            <button
              className="btn btn-primary mt-3"
              type="button"
              onClick={togglePreview}
            >
              {isOpenPreview
                ? "Close Content Preview"
                : "            Show Content Preview"}
            </button>
          </div>
        )}
      </div>

      {isOpenPreview && (
        <div className="mb-3">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="published"
          name="published"
          ref={register}
        />
        <label className="form-check-label" htmlFor="published">
          Published
        </label>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
