import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { default as LogoDarkIcon } from "../../assets/images/logos/logo.png";

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector(
    (state) => state.customizer.isMiniSidebar
  );
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link href="/">
      <a className="d-flex align-items-center gap-2">
        {isDarkMode || activeSidebarBg !== "white" ? (
          <>
            {/* <Image src={LogoWhiteIcon} alt="logo" />
            {toggleMiniSidebar ? "" : <Image src={LogoWhiteText} alt="logo" />} */}
          </>
        ) : (
          <>
            <Image src={LogoDarkIcon} alt="logo" />
          </>
        )}
      </a>
    </Link>
  );
};

export default Logo;
