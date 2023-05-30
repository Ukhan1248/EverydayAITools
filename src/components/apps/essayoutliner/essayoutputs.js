import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import { Form, Input, Button } from "reactstrap";
import { essayauthor, essaykeywords, essayoutline } from "./essayinputs";

export default function Home({ essayoutline }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Essay Outline:</h2>
          </div>
        </Form>
      </div>
      {essayoutline && <div className="p-3">{essayoutline}</div>}
    </>
  );
}
