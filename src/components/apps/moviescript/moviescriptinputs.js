import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";

export default function MoviescriptInputs({ setMoviescript }) {
  const [movietitle, setMovietitle] = useState("");
  const [writer, setWriter] = useState("");
  const [locations, setLocations] = useState("");
  const [characters, setCharacters] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getMovieScript = (e) => {
    e.preventDefault();
    setResError("");

    if (!movietitle || !writer || !locations || !characters) {
      setResError("Provide all details!");
      return;
    }

    setIsLoading(true);
    axios
      .post("/api/generate-movie-script", {
        movietitle,
        writer,
        locations,
        characters,
        email: session.user?.email,
      })
      .then((res) => {
        setMoviescript(res.data.data[0].text);
        setMovietitle("");
        setWriter("");
        setLocations("");
        setCharacters("");
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
            <h2>Movie Script Creator</h2>

            <h5>
              {" "}
              Enter in the Title, Writer, Characters, and Scene Locations to get
              your Movie Script!
            </h5>
          </div>
        </Form>
        <Form style={{ marginTop: "20px" }} onSubmit={getMovieScript}>
          <FormGroup>
            <Label for="title"> Movie Title:</Label>
            <Input
              type="text"
              value={movietitle}
              onChange={(e) => setMovietitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Write:</Label>
            <Input
              type="text"
              name="writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Locations:</Label>
            <Input
              type="text"
              name="locations"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="keyword"> Characters:</Label>
            <Input
              type="text"
              name="characters"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
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
                  Generate Movie Script...
                </span>
              </>
            ) : (
              <span style={{ fontSize: "16px" }}>Generate Movie Script</span>
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
