import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";


export default function EventemailInputs({ setEventemail }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendees, setAttendees] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getEventEmail = (e) => {
    e.preventDefault();

    setResError("");
    if (!title || !date || !location || !agenda || !attendees) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-event-email", {
        title,
        date,
        location,
        agenda,
        attendees,
        email: session.user?.email,
      })
      .then((res) => {
        setEventemail(res.data.data[0].text);
        setTitle("");
        setDate("");
        setLocation("");
        setAgenda("");
        setAttendees("");
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
            <h2>Groupt Event Email Creator</h2>
            <h5>
              Enter In the details of the event and the email will be generated!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getEventEmail}>
          <FormGroup>
            <Label for="title">   Event Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Date:</Label>
            <Input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Location:</Label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword">  Agenda Topics:</Label>
            <Input
              type="text"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword">  Attendees:</Label>
            <Input
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" color="light" className="me-2" />
                <span style={{ fontSize: "14px" }}>
                  Generate Event Email...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Event Email</span>
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
