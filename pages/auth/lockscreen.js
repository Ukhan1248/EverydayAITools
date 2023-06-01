import React from "react";
import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import AuthLogo from "../../src/layouts/logo/AuthLogo";
import LeftBg from "../../src/assets/images/bg/login-bgleft.svg";
import RightBg from "../../src/assets/images/bg/login-bg-right.svg";
import img1 from "../../src/assets/images/users/user4.jpg";

const LockScreen = () => {
  const navigate = useRouter();

  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
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
              <CardBody className="p-4 m-1">
                <div className="text-center">
                  <Image
                    src={img1}
                    alt="avatar"
                    className="rounded-circle"
                    width="95"
                    height="95"
                  />
                  <CardTitle tag="h4" className="mt-2">
                    John Deo
                  </CardTitle>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(
                      `SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`
                    );
                    navigate.push("/");
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button
                          type="submit"
                          color="info"
                          block
                          className="me-2"
                        >
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LockScreen.layout = "Blank";

export default LockScreen;
