import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ servicecall }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Service Call Summary:</h2>
          </div>
        </Form>
      </div>
      {servicecall && <div className="p-3">{servicecall}</div>}
    </>
  );
}
