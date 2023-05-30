import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ productreview }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Product Review Summary:</h2>
          </div>
        </Form>
      </div>
      {productreview && <div className="p-3">{productreview}</div>}
    </>
  );
}
