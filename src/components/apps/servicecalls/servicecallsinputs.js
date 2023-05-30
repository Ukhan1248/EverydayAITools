import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function ServicecallsInputs({ setServicecall }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [resdescription, setResdescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getServiceCall = (e) => {
    e.preventDefault();

    setResError("");
    if (!name || !time || !number || !description || !resdescription) {
      setResError("Provide all details!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/generate-service-calls", {
        name,
        time,
        number,
        description,
        resdescription,
        email: session.user?.email,
      })
      .then((res) => {
        setServicecall(res.data.data[0].text);
        setName("");
        setTime("");
        setNumber("");
        setDescription("");
        setResdescription("");
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
          <h2>Customer Service Call Creator</h2>
          <h5>
            Enter In the details of the customer and the issue to generate the
            Service Call!
          </h5>
        </div>
      </Form>
      <Form style={{ marginTop: "20px" }} onSubmit={getServiceCall}>
        <FormGroup>
          <Label for="title"> Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="keyword"> Time:</Label>
          <Input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="keyword"> Number:</Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="keyword"> Describe Issue:</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="keyword"> Resolution Description:</Label>
          <Input
            type="text"
            value={resdescription}
            onChange={(e) => setResdescription(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
          {isLoading ? (
            <>
              <Spinner size="sm" color="light" className="me-2" />
              <span style={{ fontSize: "14px" }}>Generate Service Call...</span>
            </>
          ) : (
            <span style={{ fontSize: "16px" }}>Generate Service Call</span>
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
