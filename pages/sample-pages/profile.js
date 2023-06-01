import React, { useState } from "react";

import { Row, Col, Card } from "reactstrap";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";

const Profile = () => {
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12" lg="4"></Col>
        <Col xs="12" md="12" lg="8"></Col>
      </Row>
    </>
  );
};

export default Profile;
