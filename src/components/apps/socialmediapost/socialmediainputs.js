import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function SocialmediaInputs({ setSocialmedia }) {
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getSocialMedia = (e) => {
    e.preventDefault();
    setResError("");

    if (!subject || !keywords || !hashtags) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-social-media", {
        subject,
        keywords,
        hashtags,
        email: session.user?.email,
      })
      .then((res) => {
        setSocialmedia(res.data.data[0].text);
        setSubject("");
        setKeywords("");
        setHashtags("");
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
            <h2>Social Media Post Creator</h2>
            <h5>
              Enter the subject, keywords, and hastags, and get your perfect
              post!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getSocialMedia}>
          <FormGroup>
            <Label for="title"> Subject:</Label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            <Label for="keyword"> Hashtags:</Label>
            <Input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                  Generate Social Media Post...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>
                Generate Social Media Post
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
    </>
  );
}
