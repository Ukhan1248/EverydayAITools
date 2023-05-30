import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function SlogancreatorInputs({ setSlogan }) {
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getSlogan = (e) => {
    e.preventDefault();
    setResError("");
    if (!brand || !product) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-slogan-creator", {
        brand,
        product,
        email: session.user?.email,
      })
      .then((res) => {
        setSlogan(res.data.data[0].text);
        setBrand("");
        setProduct("");
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
            <h2>Brand Slogan Creator</h2>
            <h5>Enter brand and product to recieve a slogan for your brand!</h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getSlogan}>
          <FormGroup>
            <Label for="title"> Brand or Make:</Label>
            <Input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Product or Model:</Label>
            <Input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>Generate Slogan...</span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Slogan</span>
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
