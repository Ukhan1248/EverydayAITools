import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function ProductreviewInputs({ setProductreview }) {
  const [product, setProduct] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getProductReview = (e) => {
    e.preventDefault();

    setResError("");
    if (!product || !keywords) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-product-review", {
        product,
        keywords,
        email: session.user?.email,
      })
      .then((res) => {
        setProductreview(res.data.data[0].text);
        setProduct("");
        setKeywords("");
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setResError(err.response.data?.error.tokenError);
      });
  };

  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>Product Review Creator</h2>
            <h5>Enter a popular Product and Keywords and get your review!</h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getProductReview}>
          <FormGroup>
            <Label for="title"> Product:</Label>
            <Input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Keywords:</Label>
            <Input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            className="main-btn"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                  Generate Product Review...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Product Review</span>
            )}
          </Button>
        </Form>{" "}
        {/* {isLoading && <p>Loading...</p>} */}
        {resError && (
          <p
            style={{
              marginTop: "10px",
              color: "red",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {resError}
          </p>
        )}
      </div>
    </>
  );
}
