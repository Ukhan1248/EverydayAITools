import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ contentoptimizer }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated SEO Content Optimizer Summary:</h2>
          </div>
        </Form>
      </div>
      {contentoptimizer && <div className="p-3">{contentoptimizer}</div>}
    </>
  );
}
