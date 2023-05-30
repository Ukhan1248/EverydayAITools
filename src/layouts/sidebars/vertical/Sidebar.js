import { useRouter } from "next/router";
import React from "react";
import { TfiCreditCard, TfiPackage } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "reactstrap";
import SimpleBar from "simplebar-react";
import Logo from "../../logo/Logo";
import SidebarData from "../sidebardata/SidebarData";
import NavItemContainer from "./NavItemContainer";
import NavSubMenu from "./NavSubMenu";

const Sidebar = () => {
  const location = useRouter();
  const currentURL = location.pathname.split("/").slice(0, -1).join("/");

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector(state => state.customizer.sidebarBg);
  const isFixed = useSelector(state => state.customizer.isSidebarFixed);
  const dispatch = useDispatch();

  return (
    <div
      className={`sidebarBox shadow bg-${activeBg} ${
        isFixed ? "fixedSidebar" : ""
      }`}
    >
      <SimpleBar style={{ height: "100%" }}>
        {/********Logo*******/}
        <div className="d-flex p-3 align-items-center">
          <Logo />
        </div>
        {/********Sidebar Content*******/}
        <div className="p-3 pt-1 mt-2">
          <Nav vertical className={activeBg === "white" ? "" : "lightText"}>
            {SidebarData.map(navi => {
              if (navi.caption) {
                return (
                  <div className="navCaption fw-bold mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={
                    location.pathname === navi.href ? "activeLink" : ""
                  }
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
            <NavItemContainer
              key={1}
              //toggle={() => toggle(navi.id)}
              className={
                location.pathname === "/apps/purchase-package"
                  ? "activeLink"
                  : ""
              }
              to={"/apps/purchase-package"}
              title={"Purchase Package"}
              // suffix={navi.suffix}
              // suffixColor={navi.suffixColor}
              icon={<TfiCreditCard />}
            />
            <NavItemContainer
              key={2}
              //toggle={() => toggle(navi.id)}
              className={
                location.pathname === "/apps/about-everyday-ai-tools"
                  ? "activeLink"
                  : ""
              }
              to={"/apps/about-everyday-ai-tools"}
              title={"About Everyday AI Tools"}
              // suffix={navi.suffix}
              // suffixColor={navi.suffixColor}
            />
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
