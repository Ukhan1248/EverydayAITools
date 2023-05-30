import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function ArticlesectionInputs({ setArticlesection }) {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

  const { data: session } = useSession();

  const getArticleSection = e => {
    e.preventDefault();
    if (!title || !heading || !keywords) return;

    setIsLoading(true);
    axios
      .post("/api/generate-article-section", {
        title,
        heading,
        keywords,
        email: session.user?.email,
      })
      .then(res => {
        setArticlesection(res.data.data[0].text);
        setTitle("");
        setHeading("");
        setKeywords("");
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
          <h1>Article Section Creator</h1>
          <h4>
            Enter Article Title, Heading, and Keywords to get your Article
            Section
          </h4>
        </div>
      </Form>
      <form onSubmit={getArticleSection}>
        <label>
          Article Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Section Heading:
          <input
            type="text"
            value={heading}
            onChange={e => setHeading(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Keywords:
          <input
            type="text"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Article Section</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
      {resError && (
        <p style={{ marginTop: "10px", color: "red", fontWeight: 500 }}>
          {resError}
        </p>
      )}
    </div>
  );
}
