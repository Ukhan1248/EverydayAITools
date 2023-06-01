import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";

import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import RightBg from "../../src/assets/images/bg/login-bg-right.svg";
import LeftBg from "../../src/assets/images/bg/login-bgleft.svg";
import AuthLogo from "../../src/layouts/logo/AuthLogo";

const RegisterFormik = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };
  const [showTermsCond, setShowTermsCond] = useState(false);

  const navigate = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  // handle submit
  const submitHandler = async values => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(`/api/auth/register`, options)
      .then(res => res.json())
      .then(data => {
        if (data) {
          navigate.push(`/auth/loginformik`);
        }
      });
  };

  // handleGoogleSignin
  const handleGoogleSignin = async () => {
    signIn("google", {
      callbackUrl: "http://localhost:3000",
    });
  };

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
                <h4 className="mb-0 fw-bold">Register</h4>
                <small className="pb-4 d-block">
                  Already have an account?{" "}
                  <Link href="/auth/loginformik">Login</Link>
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
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${
                            errors.confirmPassword && touched.confirmPassword
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <span
                          onClick={() => setShowTermsCond(true)}
                          style={{
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "all .3s",
                          }}
                        >
                          Read Terms and Condition
                        </span>
                      </FormGroup>
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                          className={`form-check-input ${
                            errors.acceptTerms && touched.acceptTerms
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <Label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          Accept Terms & Conditions
                        </Label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-center">
                        <Button type="submit" color="primary" className="me-2">
                          Register
                        </Button>
                        <Button type="reset" color="secondary">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
                <div>
                  <button onClick={handleGoogleSignin} className="google-btn">
                    <FcGoogle />
                    <span>Sign Up with Google</span>
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* terms and condition box */}
      <div
        className="terms-and-condition"
        style={showTermsCond ? { scale: "1" } : { scale: "0" }}
      >
        <div className="terms-wrapper">
          <div className="main-terms-wrapper">
            <p>
              Welcome to where you can generate Outputs and Ideas using ChatGPT
              for everyday tasks. Before using our website, please read the
              following Terms and Conditions carefully.
            </p>
            <div>
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using our website, you agree to be bound by
                these Terms and Conditions. If you do not agree with these Terms
                and Conditions, please do not use our website.
              </p>
            </div>
            <div>
              <h3>2. Use of Website</h3>
              <p>
                Our website is intended for personal and non-commercial use
                only. You may not use our website for any illegal or
                unauthorized purpose. You agree to comply with all applicable
                laws and regulations when using our website.
              </p>
            </div>
            <div>
              <h3>3. ChatGPT Output and Ideas</h3>
              <p>
                Our website uses ChatGPT to generate Outputs and Ideas for
                everyday tasks. ChatGPT is an artificial intelligence language
                model that is trained to provide helpful suggestions and advice.
                However, ChatGPT's outputs are generated based on various inputs
                and may not always be accurate, complete, or up-to-date.
                Therefore, we do not guarantee the accuracy, completeness, or
                reliability of ChatGPT's outputs. You should use ChatGPT's
                outputs at your own risk and discretion.
              </p>
            </div>
            <div>
              <h3>4. Intellectual Property</h3>
              <p>
                Our website and its contents, including but not limited to text,
                graphics, images, logos, and software, are the property of
                www.everydayaitools.app and its licensors and are protected by
                copyright, trademark, and other intellectual property laws. You
                may not reproduce, modify, distribute, or display any part of
                our website without our prior written consent.
              </p>
            </div>
            <div>
              <h3>5. Disclaimer of Warranties</h3>
              <p>
                Our website and its contents are provided on an "as is" and "as
                available" basis without any warranties of any kind, whether
                express or implied. We do not warrant that our website will be
                uninterrupted or error-free, or that any defects will be
                corrected. We do not warrant the accuracy, completeness, or
                reliability of any information or advice provided by ChatGPT.
              </p>
            </div>
            <div>
              <h3>6. Limitation of Liability</h3>
              <p>
                In no event shall www.everydayaitools.app or its affiliates,
                officers, directors, employees, agents, or licensors be liable
                for any damages, including but not limited to direct, indirect,
                incidental, consequential, or punitive damages, arising out of
                or in connection with the use of our website or ChatGPT's
                outputs.
              </p>
            </div>
            <div>
              <h3>7. Indemnification</h3>
              <p>
                You agree to indemnify and hold harmless Everyday AI Tools and
                its affiliates, officers, directors, employees, agents, and
                licensors from and against any and all claims, damages,
                liabilities, costs, and expenses, including reasonable
                attorneys' fees, arising out of or in connection with your use
                of our website or ChatGPT's outputs.
              </p>
            </div>
            <div>
              <h3>8. Modification of Terms</h3>
              <p>
                We reserve the right to modify these Terms and Conditions at any
                time without prior notice. Your continued use of our website
                after the modifications shall constitute your acceptance of the
                modified Terms and Conditions.
              </p>
            </div>
            <div>
              <h3>9. Governing Law</h3>
              <p>
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of the United States of America,
                without giving effect to any principles of conflicts of law.
              </p>
            </div>
            <div>
              <h3>10. Contact Us</h3>
              <p>
                If you have any questions or concerns about these Terms and
                Conditions, please contact me at umairkhan814@icloud.com
              </p>
            </div>
          </div>

          <div>
            <button onClick={() => setShowTermsCond(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterFormik.layout = "Blank";

export default RegisterFormik;

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
