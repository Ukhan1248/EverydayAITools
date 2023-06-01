import { ErrorMessage, Field, Form, Formik } from "formik";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import RightBg from "../../src/assets/images/bg/login-bg-right.svg";
import LeftBg from "../../src/assets/images/bg/login-bgleft.svg";
import AuthLogo from "../../src/layouts/logo/AuthLogo";

const LoginFormik = () => {
  const navigate = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // handleGoogleSignin
  const handleGoogleSignin = async () => {
    signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/",
    });
  };

  // submit handler
  const submitHandler = async values => {
    // e.preventDefault();

    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: values?.email,
        password: values?.password,
        callbackUrl: "/",
      });

      if (status?.ok) {
        navigate?.push(status?.url);
      }
    } catch (error) {
      alert("error=>", error.message);
    }
  };

  return (
    <div className="loginBox">
      <div className="position-absolute start-0 bottom-0">
        <Image src={LeftBg} alt="left" />
      </div>
      <div className="position-absolute flex-end-0 top">
        <Image src={RightBg} alt="right" />
      </div>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">
                  Login with the email and password you registered with or
                  Google
                </h4>
                <small className="pb-4 d-block">
                  Don't have an account?{" "}
                  <Link href="/auth/registerformik">Sign Up</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={fields => {
                    // eslint-disable-next-line no-alert
                    submitHandler(fields);
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? " is-invalid" : ""
                          }`}
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
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
                          // value={password}
                          // onChange={(e) => setPassword(e.target.value)}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label>
                      </FormGroup>
                      <FormGroup>
                        <Button
                          type="submit"
                          color="primary"
                          block
                          className="me-2"
                        >
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
                <div>
                  <button onClick={handleGoogleSignin} className="google-btn">
                    <FcGoogle />
                    <span>Sign In with Google</span>
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LoginFormik.layout = "Blank";

export default LoginFormik;

export async function getServerSideProps({ req }) {
  const session = await getSession({
    req,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
