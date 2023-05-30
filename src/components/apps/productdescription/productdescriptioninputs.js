import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function ProductdescriptionInputs({ setProductdescription }) {
  const [product, setProduct] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getProductDescription = (e) => {
    e.preventDefault();

    setResError("");
    if (!product || !keywords) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-product-description", {
        product,
        keywords,
        email: session.user?.email,
      })
      .then((res) => {
        setProductdescription(res.data.data[0].text);
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
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h2>Product Description Creator</h2>
          <h5>
            Enter a popular Product and Keywords and get your Product
            Description!
          </h5>
        </div>
      </Form>
      <Form style={{ marginTop: "20px" }} onSubmit={getProductDescription}>
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
                Generate Product Description...
              </span>
            </>
          ) : (
            <span style={{ fontSize: "16px" }}>
              Generate Product Description
            </span>
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
  );
}
