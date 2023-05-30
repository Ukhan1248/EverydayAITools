import React from "react";
import ProfileLayout from "./ProfileLayout";

const AccountDetails = () => {
  return (
    <ProfileLayout heading="Account Details">
      <div className="account-details">
        <form action="">
          <div className="flex flex-col gap-30">
            <div className="flex items-center justify-between gap-30">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="text" placeholder="Display Name" />
            <div>
              <input type="email" placeholder="Email" />
            </div>
            <h2>Password change</h2>
            <input type="password" placeholder="Current Password" />
            <div className="flex items-center justify-between gap-30">
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div>
              <button>SAVE CHANGES</button>
            </div>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default AccountDetails;
