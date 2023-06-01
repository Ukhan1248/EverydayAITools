import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import EventemailInputs from "../../../src/components/apps/eventemail/eventemailinputs";
import EventemailOutputs from "../../../src/components/apps/eventemail/eventemailoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [eventemail, setEventemail] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <EventemailInputs setEventemail={setEventemail} />
              </>
            }
            rightContent={
              <>
                <EventemailOutputs eventemail={eventemail} />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;

export async function getServerSideProps({ req }) {
  const session = await getSession({
    req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/loginformik",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
