import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";


export default function CoverletterInputs({ setCoverletter }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [degrees, setDegrees] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getCoverletter = e => {
    e.preventDefault();
    setResError("");

    if (!company || !position || !skills || !degrees) {
      setResError("Provide all details!");
      return;
    }

    setIsLoading(true);
    axios
      .post("/api/generate-cover-letter", {
        company,
        position,
        skills,
        degrees,
        email: session.user?.email,
      })
      .then(res => {
        setCoverletter(res.data.data[0].text);
        setCompany("");
        setPosition("");
        setSkills("");
        setDegrees("");
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setResError(err.response.data?.error.tokenError);
      });
  };

  return (
    <>
   
    <div className="p-3 border-bottom">
        <Form>
          <div>
          <h2>Cover Letter Creator</h2>
          <h5>
            Enter a Company, Position, Skills and Degrees and get your cover
            letter!
          </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getCoverletter}>
          <FormGroup>
            <Label for="title"> Company:</Label>
            <Input
              type="text"
              value={company}
            onChange={(e) => setCompany(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Position:</Label>
            <Input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Skills:</Label>
            <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Degrees:</Label>
            <Input
              type="text"
              value={degrees}
            onChange={e => setDegrees(e.target.value)}
            />
          </FormGroup>
         
          <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                Generate Cover Letter...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Cover Letter</span>
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
