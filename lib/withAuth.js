import React, { useEffect } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import Router from "next/router";

const withAuth = (Component) => (props) => {
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      Router.push("/signin");
    }
  }, [isLoading]);

  if (user) {
    return <Component {...props} />;
  }

  return (
    <div className="container text-center my-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );
};

export default withAuth;
