import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ recruiterresponse }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Recruiter Response Email:</h2>
          </div>
        </Form>
      </div>
      {recruiterresponse && <div className="p-3">{recruiterresponse}</div>}
    </>
  );
}
