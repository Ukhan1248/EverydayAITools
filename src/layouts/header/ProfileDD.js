import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Droplet, FileText, Settings, Star, User } from "react-feather";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { DropdownItem } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";

const ProfileDD = () => {
  const { data: session } = useSession();
  const { image, email } = session?.user || {};

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/api/users/${email}`);
      const json = await res.json();

      setUser(json);
    }

    fetchData();
  }, [session]);
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <Image
          src={image}
          alt="user"
          className="rounded-circle"
          width="60"
          height="60"
        />
        <span>
          <small>{email}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <TfiPackage style={{ fontSize: "18px" }} />
        &nbsp; Package :{" "}
        <span>
          {user?.package === "free"
            ? "3 Day Free Trial"
            : user?.package?.toUpperCase()}
        </span>
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <MdOutlineGeneratingTokens style={{ fontSize: "20px" }} />
        &nbsp; Responses : <span>{user?.tokens}</span>
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Link href="/profile/my-profile">
          <a
            style={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <User size={20} />
            &nbsp; Subscription Details
          </a>
        </Link>
      </DropdownItem>

      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
