import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="card">
      <div className="d-flex align-items-center justify-content-center my-2">
        <img
          src={user.photoURL}
          alt={user.displayName}
          width="100"
          height="100"
          className="rounded-circle "
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{user.displayName}</h5>
      </div>
    </div>
  );
};

export default UserProfile;
