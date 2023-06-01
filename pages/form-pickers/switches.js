/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "reactstrap";

import Switch from "react-bootstrap-switch";

import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";
import ComponentCard from "../../src/components/ComponentCard";

const Swtiches = () => {
  return (
    <div>
      <BreadCrumbs />

      {/*--------------------------------------------------------------------------------*/}
      {/* Start Switches                                                                 */}
      {/*--------------------------------------------------------------------------------*/}

      <Row>
        <Col md="4">
          <ComponentCard title="Default Switch">
            <Switch defaultValue={false} /> <Switch />
          </ComponentCard>
        </Col>
        <Col md="4">
          <ComponentCard title="Simple Switch">
            <Switch onText="Red" offText="Yellow" defaultValue={false} />{" "}
            <Switch onText="Yellow" offText="Red" />
          </ComponentCard>
        </Col>
        <Col md="4">
          <ComponentCard title="Switch with Icons">
            <Switch
              onText={<i className="bi bi-patch-check" />}
              offText={<i className="bi bi-patch-minus" />}
              defaultValue={false}
            />{" "}
            <Switch
              onText={<i className="bi bi-patch-minus" />}
              offText={<i className="bi bi-patch-check" />}
            />
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Swtiches;
