import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import {
  default as LogoDarkIcon,
  default as LogoWhiteIcon,
} from "../../assets/images/logos/logo.png";

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activetopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link href="/">
      <a className="d-flex align-items-center gap-2">
        {isDarkMode || activetopbarBg !== "white" ? (
          <>
            <Image src={LogoWhiteIcon} alt="logo" />
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
