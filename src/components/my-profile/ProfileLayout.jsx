import React from "react";

const ProfileLayout = ({ heading, children }) => {
  return (
    <div className="profile-layout">
      <div>
        <h2 className="heading">{heading}</h2>
      </div>
      <div className="details">{children}</div>
    </div>
  );
};

export default ProfileLayout;
