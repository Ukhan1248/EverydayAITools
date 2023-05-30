import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Customizer from "./customizer/Customizer";
import Header from "./header/Header";
import HorizontalHeader from "./header/HorizontalHeader";
import HorizontalSidebar from "./sidebars/horizontal/HorizontalSidebar";
import Sidebar from "./sidebars/vertical/Sidebar";

const FullLayout = ({ children }) => {
  const customizerToggle = useSelector(
    (state) => state.customizer.customizerSidebar
  );
  const toggleMiniSidebar = useSelector(
    (state) => state.customizer.isMiniSidebar
  );
  const showMobileSidebar = useSelector(
    (state) => state.customizer.isMobileSidebar
  );
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector(
    (state) => state.customizer.isLayoutHorizontal
  );
  const isFixedSidebar = useSelector(
    (state) => state.customizer.isSidebarFixed
  );
  const direction = useSelector((state) => state.customizer.isRTL);
  return (
    <main>
      <div
        className={direction ? "rtl" : "ltr"}
        dir={direction ? "rtl" : "ltr"}
      >
        <div
          className={`pageWrapper d-md-block d-lg-flex ${
            toggleMiniSidebar ? "isMiniSidebar" : ""
          }`}
        >
          {/******** Sidebar **********/}
          {LayoutHorizontal ? (
            ""
          ) : (
            <aside
              className={`sidebarArea ${
                showMobileSidebar ? "showSidebar" : ""
              }`}
            >
              <Sidebar />
            </aside>
          )}
          {/********Content Area**********/}

          <div className={`contentArea ${topbarFixed ? "fixedTopbar" : ""}`}>
            {/********header**********/}
            {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
            {LayoutHorizontal ? <HorizontalSidebar /> : ""}
            {/********Middle Content**********/}
            <Container className="p-4">
              <div
                className={
                  isFixedSidebar && LayoutHorizontal ? "HsidebarFixed" : ""
                }
              >
                {children}
              </div>
              <Customizer
                className={customizerToggle ? "showCustomizer" : ""}
              />
              {showMobileSidebar || customizerToggle ? (
                <div className="sidebarOverlay" />
              ) : (
                ""
              )}
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
