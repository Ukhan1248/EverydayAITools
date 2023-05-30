import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const LightTheme = React.lazy(() =>
  import("../../../styles/style.module.scss")
);
const DarkTheme = React.lazy(() =>
  import("../../../styles/styledark.module.scss")
);

const ThemeSelector = ({ children }) => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  return (
    <>
      <>{isDarkMode ? <DarkTheme /> : <LightTheme />}</>
      {children}
    </>
  );
};

ThemeSelector.propTypes = {
  children: PropTypes.node,
};

export default ThemeSelector;
