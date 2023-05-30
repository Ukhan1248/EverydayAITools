import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ eventemail }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Event Email:</h2>
          </div>
        </Form>
      </div>
      {eventemail && <div className="p-3">{eventemail}</div>}
    </>
  );
}
