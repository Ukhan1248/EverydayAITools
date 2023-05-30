import { Button, Col, ButtonGroup, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import PropTypes from "prop-types";
import {
  ChangeTopbarColor,
  ToggleCustomizer,
  ChangeDirection,
  ChangeDarkMode,
  ChangeSidebarColor,
  ToggleTopbar,
  FixedSidebar,
  ToggleHorizontal,
} from "../../../store/customizer/CustomizerSlice";
import { ColorsBg, SidebarColorsBg } from "./data";

const Customizer = ({ className }) => {
  const dispatch = useDispatch();
  const topbarColor = useSelector(state => state.customizer.topbarBg);
  const direction = useSelector(state => state.customizer.isRTL);
  const customtoggle = useSelector(state => state.customizer.customizerSidebar);
  const isDarkMode = useSelector(state => state.customizer.isDark);
  const activeSidebarBg = useSelector(state => state.customizer.sidebarBg);
  const topbarFixed = useSelector(state => state.customizer.isTopbarFixed);
  const isSidebarFixed = useSelector(state => state.customizer.isSidebarFixed);
  const LayoutHorizontal = useSelector(
    state => state.customizer.isLayoutHorizontal
  );

  return (
    <aside className={`customizerSidebar shadow ${className}`}>
      <Row>
        <Col>
          <div className="p-3 border-bottom">
            <h5 className="mb-0">Color Customizer</h5>
            <small>Change Color and Preview </small>
          </div>
          <SimpleBar style={{ height: "calc(100vh - 85px)" }}>
            <div className="p-3">
              <br />
              <Button
                color="danger"
                className="custombtn"
                onClick={() => dispatch(ToggleCustomizer())}
              >
                {customtoggle ? (
                  <i className="bi bi-x" />
                ) : (
                  <i className="bi bi-gear" />
                )}
              </Button>
              <h6>Topbar Color</h6>
              <div className="button-group">
                {ColorsBg.map(colorbg => (
                  <Button
                    color={colorbg.bg}
                    key={colorbg.bg}
                    size="sm"
                    onClick={() => dispatch(ChangeTopbarColor(`${colorbg.bg}`))}
                  >
                    {topbarColor === colorbg.bg ? (
                      <i className="bi bi-check" />
                    ) : (
                      <i className="bi bi-circle" />
                    )}
                  </Button>
                ))}
              </div>
              <br />
              <br />
              <h6>Change sidebar Color</h6>
              <div className="button-group">
                {SidebarColorsBg.map(colorbg => (
                  <Button
                    color={colorbg.bg}
                    key={colorbg.bg}
                    size="sm"
                    onClick={() =>
                      dispatch(ChangeSidebarColor(`${colorbg.bg}`))
                    }
                  >
                    {activeSidebarBg === colorbg.bg ? (
                      <i className="bi bi-check" />
                    ) : (
                      <i className="bi bi-circle" />
                    )}
                  </Button>
                ))}
              </div>
              <br />
              <br />
            </div>
          </SimpleBar>
        </Col>
      </Row>
    </aside>
  );
};
Customizer.propTypes = {
  className: PropTypes.string,
};

export default Customizer;
