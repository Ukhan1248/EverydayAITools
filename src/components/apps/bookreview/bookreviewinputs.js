import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function BookreviewInputs({ setBookreview }) {
  const [booktitle, setBooktitle] = useState("");
  const [bookauthor, setBookauthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getBookReview = (e) => {
    e.preventDefault();
    setResError("");
    if (!booktitle || !bookauthor) {
      setResError("Provide all details!");
      return;
    }

    setIsLoading(true);
    axios
      .post("/api/generate-book-review", {
        booktitle,
        bookauthor,
        email: session.user?.email,
      })
      .then((res) => {
        setBookreview(res.data.data[0].text);
        setBooktitle("");
        setBookauthor("");
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
            <h2>Book Review Creator</h2>

            <h5> Enter a popular Book Title and Author and get your review!</h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getBookReview}>
          <FormGroup>
            <Label for="title"> Book Title:</Label>
            <Input
              type="text"
              name="title"
              value={booktitle}
              onChange={(e) => setBooktitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Book Author:</Label>
            <Input
              type="text"
              name="keyword"
              value={bookauthor}
              onChange={(e) => setBookauthor(e.target.value)}
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
                  Generate Book Review...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Book Review</span>
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
