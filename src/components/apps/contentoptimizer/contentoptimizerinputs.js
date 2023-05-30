import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function ContentoptimizerInputs({ setContentoptimizer }) {
  const [topics, setTopics] = useState("");
  const [keywords, setKeywords] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getContentOptimizer = (e) => {
    e.preventDefault();

    setResError("");
    if (!topics || !keywords || !competitors) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-content-optimizer", {
        topics,
        keywords,
        competitors,
        email: session.user?.email,
      })
      .then((res) => {
        setContentoptimizer(res.data.data[0].text);
        setTopics("");
        setKeywords("");
        setCompetitors("");
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
          <h2>SEO Content Optimizer</h2>
          <h5>
            Enter in a Topic, Keywords, and Competitors to get ideas on how to
            improve your SEO Content!
          </h5>
        </div>
      </Form>
      <Form style={{ marginTop: "20px" }} onSubmit={getContentOptimizer}>
        <FormGroup>
          <Label for="title"> Topic:</Label>
          <Input
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
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
        <FormGroup>
          <Label for="keyword"> Competitors:</Label>
          <Input
            type="text"
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary" disabled={isLoading} className="main-btn" >
          {isLoading ? (
            <>
              <Spinner size="sm" color="light" className="me-2" />
              <span style={{ fontSize: "14px" }}>Generate SEO Content...</span>
            </>
          ) : (
            <span style={{ fontSize: "16px" }}>Generate SEO Content</span>
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
