import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ productdescription }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Product Description Summary:</h2>
          </div>
        </Form>
      </div>
      {productdescription && <div className="p-3">{productdescription}</div>}
    </>
  );
}
