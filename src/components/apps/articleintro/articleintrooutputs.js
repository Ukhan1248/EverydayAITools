import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ articleintro }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          
            <h2>AI Generated Article Intro:</h2>
         
        </Form>
      </div>
      {articleintro && <div className="p-3">{articleintro}</div>}
    </>
  );
}
