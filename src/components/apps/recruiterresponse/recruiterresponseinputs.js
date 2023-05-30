import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function RecruiterresponseInputs({ setRecruiterresponse }) {
  const [name, setName] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [interested, setInterested] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getRecruiterresponse = (e) => {
    e.preventDefault();

    setResError("");

    if (!name || !jobtitle || !interested || !contact) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-recruiter-response", {
        name,
        jobtitle,
        interested,
        contact,
        email: session.user?.email,
      })
      .then((res) => {
        setRecruiterresponse(res.data.data[0].text);
        setName("");
        setJobtitle("");
        setInterested("");
        setContact("");
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
            <h2>Recruiter Response Email Creator</h2>
            <h5>
              Enter a Recruiter Name, Job Title, Interest, and Contact Info and
              get your response!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getRecruiterresponse}>
          <FormGroup>
            <Label for="title"> Recruiter Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Job Title:</Label>
            <Input
              type="text"
              value={jobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Interested - Yes or No:</Label>
            <Input
              type="text"
              value={interested}
              onChange={(e) => setInterested(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Contact Info - Phone or Email:</Label>
            <Input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                  Generate Recruiter Email...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Recruiter Email</span>
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
