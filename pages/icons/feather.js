import React from "react";
import { Row, Col } from "reactstrap";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";
import ficons from "../../data/icons/Ficons";
import ComponentCard from "../../src/components/ComponentCard";

const FeatherIcons = () => {
  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Feather Icons">
        <Row>
          {ficons.map((fico) => (
            <Col xs="12" md="6" lg="3" key={fico.name}>
              <div className="hstack gap-3 py-3">
                {fico.name}
                <span>{fico.title}</span>
              </div>
            </Col>
          ))}
        </Row>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default FeatherIcons;
