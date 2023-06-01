import React from "react";
import {
  Button,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import Image from "next/image";
import AuthLogo from "../../src/layouts/logo/AuthLogo";
import LeftBg from "../../src/assets/images/bg/login-bgleft.svg";
import RightBg from "../../src/assets/images/bg/login-bg-right.svg";

const Maintanance = () => {
  return (
    <div className="loginBox">
      <div className="position-absolute start-0 bottom-0">
        <Image src={LeftBg} alt="left" />
      </div>
      <div className="position-absolute end-0 top">
        <Image src={RightBg} alt="right" />
      </div>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1 text-center">
                <div className="mt-3 mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-warning display-5"></i>
                </div>
                <CardTitle tag="h4">Your page in under maintenance</CardTitle>
                <h5 className="mb-0 text-muted font-medium">
                  Something wrong going on this page.
                </h5>
                <h5 className="text-muted font-medium mb-4">
                  Please Check back again.
                </h5>

                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Button color="primary">
                    <i aria-hidden="true" className="bi bi-facebook"></i>
                  </Button>
                  <Button color="info">
                    <i aria-hidden="true" className="bi bi-twitter"></i>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Maintanance.layout = "Blank";

export default Maintanance;
