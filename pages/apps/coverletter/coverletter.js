import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import CoverletterInputs from "../../../src/components/apps/coverletter/coverletterinputs";
import CoverletterOutputs from "../../../src/components/apps/coverletter/coverletteroutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [coverletter, setCoverletter] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <CoverletterInputs setCoverletter={setCoverletter} />
              </>
            }
            rightContent={
              <>
                <CoverletterOutputs coverletter={coverletter} />
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
