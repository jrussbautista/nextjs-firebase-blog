import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth, storage, STATE_CHANGED } from "../../lib/firebase";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const onFileChange = (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
        toast.success("Successfully uploaded image");
      })
      .catch(() => {
        toast.error(
          "Sorry! We were not able to upload your image right now. Please try again later."
        );
      });
  };

  return (
    <div className="mb-3">
      {uploading && (
        <div className="text-center mb-2">
          <div class="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {uploading && <h3 className="text-center">{progress}%</h3>}

      {downloadURL && (
        <>
          <p> Copy this image code to your post content</p>
          <code className="d-block">{`![alt](${downloadURL})`}</code>
        </>
      )}

      {!uploading && (
        <>
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onFileChange}
          />
        </>
      )}
    </div>
  );
};

export default ImageUploader;
