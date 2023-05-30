import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ socialmedia }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Social Media Post Summary:</h2>
          </div>
        </Form>
      </div>
      {socialmedia && <div className="p-3">{socialmedia}</div>}
    </>
  );
}
