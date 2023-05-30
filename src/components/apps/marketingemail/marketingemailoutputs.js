import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ marketingemail }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Marketing Email:</h2>
          </div>
        </Form>
      </div>
      {marketingemail && <div className="p-3">{marketingemail}</div>}
    </>
  );
}
