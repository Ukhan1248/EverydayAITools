import React, { useEffect } from "react";
import { Collapse, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

const NavSubMenu = ({ icon, title, items, isUrl, suffixColor, suffix }) => {
  const location = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (isUrl) {
      setCollapsed(!collapsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavItem className={collapsed ? "activeParent" : ""}>
      <NavLink className="cursor-pointer gap-3" onClick={toggle}>
        <span className="sidebarIcon">{icon}</span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span className="d-block">{title}</span>
            <span className="ms-auto">
              <span className={`badge me-2 ${suffixColor}`}>{suffix}</span>
              <i
                className={`bi fs-8 ${
                  collapsed ? "bi-chevron-down" : "bi-chevron-right"
                }`}
              />
            </span>
          </div>
        </span>
      </NavLink>

      <Collapse isOpen={collapsed} navbar tag="ul" className="subMenu">
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`hide-mini ${
              location.pathname === item.href ? "activeLink" : ""
            }`}
          >
            <Link href={item.href}>
              <a className="gap-3 nav-link">
                <span className="sidebarIcon">{item.icon}</span>
                <span className="hide-mini">
                  <span>{item.title}</span>
                </span>
              </a>
            </Link>
          </NavItem>
        ))}
      </Collapse>
    </NavItem>
  );
};
NavSubMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.node,
  isUrl: PropTypes.bool,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};
export default NavSubMenu;
