import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ slogan }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Slogan:</h2>
          </div>
        </Form>
      </div>
      {slogan && <div className="p-3">{slogan}</div>}
    </>
  );
}
