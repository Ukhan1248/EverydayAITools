import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ articlesection }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Article Section:</h2>
          </div>
        </Form>
      </div>
      {articlesection && <div className="p-3">{articlesection}</div>}
    </>
  );
}
