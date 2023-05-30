import { NavItem } from "reactstrap";
import Link from "next/link";
import PropTypes from "prop-types";

const NavSingleItem = ({
  to,
  icon,
  title,
  toggle,
  className,
  suffix,
  suffixColor,
}) => {
  return (
    <NavItem onClick={toggle} className={className}>
      <Link href={to} passHref>
        <a className="nav-link gap-3">
          <span className="sidebarIcon">{icon}</span>
          <div className="d-flex flex-grow-1 align-items-center gap-2">
            <span>{title}</span>
            {suffix ? (
              <span className={`badge ms-auto ${suffixColor}`}>{suffix}</span>
            ) : (
              ""
            )}
          </div>
        </a>
      </Link>
    </NavItem>
  );
};
NavSingleItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  toggle: PropTypes.func,
  className: PropTypes.string,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};

export default NavSingleItem;
