import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

const NavSubItem = ({
  icon,
  title,
  items,
  suffix,
  activeBck,
  suffixColor,
  ddType,
}) => {
  const location = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavItem className={`collapsed ${ddType}`}>
      <NavLink className="gap-3 cursor-pointer" onClick={Handletoggle}>
        <span className="sidebarIcon">{icon}</span>
        <div className="d-flex flex-grow-1 align-items-center gap-2">
          <span className="me-auto">{title}</span>
          {suffix ? (
            <span className={`badge  ${suffixColor}`}>{suffix}</span>
          ) : (
            ""
          )}
          <i className="bi bi-chevron-down" />
        </div>
      </NavLink>
      <Nav
        vertical
        className={`firstDD bg-${activeBck} ${isOpen ? "showfirstDD" : ""}`}
      >
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`${location.pathname === item.href ? "activeLink" : ""}`}
          >
            <Link href={item.href}>
              <a className="nav-link gap-3">
                <span className="sidebarIcon">{item.icon}</span>
                <span className="">
                  <span>{item.title}</span>
                </span>
              </a>
            </Link>
          </NavItem>
        ))}
      </Nav>
    </NavItem>
  );
};

NavSubItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  items: PropTypes.array,
  suffix: PropTypes.any,
  activeBck: PropTypes.string,
  suffixColor: PropTypes.string,
  ddType: PropTypes.string,
};
export default NavSubItem;
