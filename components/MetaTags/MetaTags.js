import React from "react";

const MetaTags = ({
  title = "Dev",
  description = "Full",
  image = "https://fireship.io/courses/react-next-firebase/img/featured.png'",
}) => {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </>
  );
};

export default MetaTags;
