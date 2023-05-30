import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function MarketingemailInputs({ setMarketingemail }) {
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("");
  const [product, setProduct] = useState("");
  const [offer, setOffer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getMarketingEmail = (e) => {
    e.preventDefault();
    setResError("");
    if (!subject || !audience || !product || !offer) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-marketing-email", {
        subject,
        audience,
        product,
        offer,
        email: session.user?.email,
      })
      .then((res) => {
        setMarketingemail(res.data.data[0].text);
        setSubject("");
        setAudience("");
        setProduct("");
        setOffer("");
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
            <h2>Marketing Email Creator</h2>
            <h5>
              Enter a subject, audience, product, and trial offer and get your
              email!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getMarketingEmail}>
          <FormGroup>
            <Label for="title"> Subject:</Label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Audience:</Label>
            <Input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Product:</Label>
            <Input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Trial Offer:</Label>
            <Input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
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
                  Generate Marketing Email...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Marketing Email</span>
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
