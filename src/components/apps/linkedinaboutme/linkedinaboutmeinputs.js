import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function LinkedinaboutmeInputs({ setLinkedinaboutme }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [degrees, setDegrees] = useState("");
  const [skills, setSkills] = useState("");
  const [titles, setTitles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getLinkedinaboutme = e => {
    e.preventDefault();

    setResError("");

    if (!name || !title || !experience || !degrees || !skills || !titles) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-linkedin-about", {
        name,
        title,
        experience,
        degrees,
        skills,
        titles,
        email: session.user?.email,
      })
      .then(res => {
        setLinkedinaboutme(res.data.data[0].text);
        setName("");
        setTitle("");
        setExperience("");
        setDegrees("");
        setSkills("");
        setTitles("");
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
            <h2>Linkedin About Me Creator</h2>
            <h5>
              {" "}
              Enter your name, current title, years of experience, degrees,
              skills, and additional titles and get your Linkedin about me
              summary!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getLinkedinaboutme}>
          <FormGroup>
            <Label for="title"> Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Current Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Years of Experience:</Label>
            <Input
              type="text"
              value={experience}
              onChange={e => setExperience(e.target.value)}
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
          <FormGroup>
            <Label for="keyword"> Skills:</Label>
            <Input
              type="text"
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Additional titles:</Label>
            <Input
              type="text"
              value={titles}
              onChange={e => setTitles(e.target.value)}
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
                  Generate Linkedin About Me...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>
                Generate Linkedin About Me
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
