import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ linkedinaboutme }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Linkedin About Me Summary:</h2>
          </div>
        </Form>
      </div>
      {linkedinaboutme && <div className="p-3">{linkedinaboutme}</div>}
    </>
  );
}
