import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ coverletter }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Cover Letter:</h2>
          </div>
        </Form>
      </div>
      {coverletter && <div className="p-3">{coverletter}</div>}
    </>
  );
}
