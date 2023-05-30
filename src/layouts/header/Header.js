import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
} from "reactstrap";

import user1 from "../../assets/images/users/user1.jpg";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogoWhite from "../../assets/images/logos/logo.png";
import ProfileDD from "./ProfileDD";

const Header = () => {
  const isDarkMode = useSelector(state => state.customizer.isDark);
  const topbarColor = useSelector(state => state.customizer.topbarBg);
  const dispatch = useDispatch();

  const { data: session } = useSession();

  // handle logout
  const handleLogout = () => {
    signOut();
  };
  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="topbar bg-gradient"
    >
      {/******************************/}
      {/**********Toggle Buttons**********/}
      {/******************************/}
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-sm-block d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
      </div>

      {/******************************/}
      {/**********Left Nav Bar**********/}
      {/******************************/}

      <Nav className="me-auto d-flex flex-row align-items-center" navbar>
        <span className="heading-title">
          Everyday AI Tools - AI Text Generation Tools <br /> to help you create
          Content and Ideas!
        </span>
      </Nav>
      {/******************************/}
      {/**********Notification DD**********/}
      {/******************************/}
      <div className="d-flex">
        {/******************************/}
        {/**********Profile DD**********/}
        {/******************************/}

        <UncontrolledDropdown className=" hov-dd">
          <DropdownToggle color="transparent" style={{ lineHeight: "0px" }}>
            <Image
              src={session?.user?.image || user1}
              alt="profile"
              className="rounded-circle"
              width="45"
              height="45"
            />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <ProfileDD />
            <div className="p-2 px-3">
              <Button color="danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Navbar>
  );
};

export default Header;
