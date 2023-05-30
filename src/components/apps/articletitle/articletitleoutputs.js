import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ articletitle }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Article Title:</h2>
          </div>
        </Form>
      </div>
      {articletitle && <div className="p-3">{articletitle}</div>}
    </>
  );
}
