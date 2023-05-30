import React, { useState } from "react";

import { Form, Input, Button } from "reactstrap";

export default function Home({ moviescript }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Movie Script:</h2>
          </div>
        </Form>
      </div>
      {moviescript && <div className="p-3">{moviescript}</div>}
    </>
  );
}
