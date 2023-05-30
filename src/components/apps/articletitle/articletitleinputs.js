import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Form, FormGroup, Label, Input, Button,Spinner  } from "reactstrap";

export default function ArticletitleInputs({ setArticletitle }) {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getArticleTitle = e => {
    e.preventDefault();
    setResError("")
    if (!topic || !keyword) {
      setResError("Provide all details!")
      return
    };

    setIsLoading(true);
    axios
      .post("/api/generate-article-title", {
        topic,
        keyword,
        email: session.user?.email,
      })
      .then(res => {
        setArticletitle(res.data.data[0].text);
        setTopic("");
        setKeyword("");
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
        <h2>Article Title Creator</h2>
       
        <h5 >   Enter one or more topics and keywords to get 5 article titles!</h5>
      </div>
    </Form>
    <Form style={{marginTop:"20px"}} onSubmit={getArticleTitle}>
      <FormGroup>
        <Label for="title">  Topic(s):</Label>
        <Input
          type="text"
          name="title"
          value={topic} onChange={e => setTopic(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="keyword">  Keywords:</Label>
        <Input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" color="primary" disabled={isLoading} className="main-btn">
          {isLoading ? (
            <>
              <Spinner size="sm" color="light" className="me-2" />
              <span style={{fontSize:"14px"}}>Generate Article Titles...</span>
            </>
          ) : (
            <span style={{fontSize:"16px"}}>Generate Article Titles</span>
          )}
        </Button>
    </Form>{" "}
    {/* {isLoading && <p>Loading...</p>} */}
    {resError && (
      <p style={{ marginTop: "10px", color: "red",fontSize:"12px", fontWeight: "bold" }}>
        {resError}
      </p>
    )}
  </div>
    </>
  );
}
