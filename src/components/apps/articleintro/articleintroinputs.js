import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Form, FormGroup, Label, Input, Button,Spinner  } from "reactstrap";
export default function ArticleintroInputs({ setArticleintro }) {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getArticleintro = e => {
    e.preventDefault();
    setResError("")
    if (!title || !keyword){
      setResError("Please provide details!")
      return};

    setIsLoading(true);
    axios
      .post("/api/generate-article-intro", {
        title,
        keyword,
        email: session.user?.email,
      })
      .then(res => {
        setArticleintro(res.data.data[0].text);
        setTitle("");
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
    <div className="p-3 border-bottom">
    <Form>
      <div>
        <h2>Article Intro Creator</h2>
       
        <h5 >Enter Article Title and Keywords to get your Article Intro.</h5>
      </div>
    </Form>
    <Form style={{marginTop:"20px"}} onSubmit={getArticleintro}>
      <FormGroup>
        <Label for="title">Article Title:</Label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="keyword">Keywords:</Label>
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
              <span style={{fontSize:"14px"}}>Generating Article Intro...</span>
            </>
          ) : (
            <span style={{fontSize:"16px"}}>Generating Article Intro</span>
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
  );
}
