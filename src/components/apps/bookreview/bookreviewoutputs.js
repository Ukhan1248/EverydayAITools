import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ bookreview }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Book Review Summary:</h2>
          </div>
        </Form>
      </div>
      {bookreview && <div className="p-3">{bookreview}</div>}
    </>
  );
}
