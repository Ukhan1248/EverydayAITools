/* eslint-disable @next/next/link-passhref */
import { Container, Button } from "reactstrap";
import Link from "next/link";
import errorBg from "../src/assets/images/background/error-bg.jpg";

const Error = () => {
  return (
    <Container>
      <div
        className="loginBox"
        style={{ background: `url(${errorBg}) no-repeat bottom center #fff` }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <h1 className="error-title">404</h1>
            <div className="my-3">
              <h4>PAGE NOT FOUND !</h4>
              <span className="text-muted d-block fs-5">
                You seem to be trying to find his way home{" "}
              </span>
            </div>
            <Link href="/">
              <Button color="primary">Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

Error.layout = "Blank";
export default Error;
