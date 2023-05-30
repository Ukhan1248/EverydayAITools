import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function EssayInputs({ setEssayoutline }) {
  const [essaytitle, setEssaytitle] = useState("");
  const [essaykeywords, setEssaykeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getEssayOutline = (e) => {
    e.preventDefault();
    setResError("");

    if (!essaytitle || !essaykeywords) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-essay-outline", {
        essaytitle,
        essaykeywords,
        email: session.user?.email,
      })
      .then((res) => {
        setEssayoutline(res.data.data[0].text);
        setEssaytitle("");
        setEssaykeywords("");
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
            <h2>Essay Outline Creator</h2>

            <h5>
              {" "}
              Enter in a title and some keywords to get your Essay Outline!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getEssayOutline}>
          <FormGroup>
            <Label for="title"> Title:</Label>
            <Input
              type="text"
              value={essaykeywords}
              onChange={(e) => setEssaykeywords(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Keywords:</Label>
            <Input
              type="text"
              name="keyword"
              value={essaykeywords}
              onChange={(e) => setEssaykeywords(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                  Generate Essay Outline...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Essay Outline</span>
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
