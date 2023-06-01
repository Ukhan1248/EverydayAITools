import { Row, Col } from "reactstrap";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";

const Classic = () => {
  return (
    <>
      <BreadCrumbs />

      <Row>
        <Col lg="4"></Col>
        <Col lg="4"></Col>
        <Col lg="4"></Col>
      </Row>
      {/*********************Chat & comment ************************/}
      <Row>
        <Col lg="6" sm="12"></Col>
        <Col lg="6" sm="12"></Col>
      </Row>
      {/*********************Project Table ************************/}
      <Row>
        <Col lg="8"></Col>
        <Col lg="4"></Col>
      </Row>
    </>
  );
};

export default Classic;
