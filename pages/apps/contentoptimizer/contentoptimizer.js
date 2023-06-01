import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ContentoptimizerInputs from "../../../src/components/apps/contentoptimizer/contentoptimizerinputs";
import ContentoptimizerOutputs from "../../../src/components/apps/contentoptimizer/contentoptimizeroutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [contentoptimizer, setContentoptimizer] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ContentoptimizerInputs
                  setContentoptimizer={setContentoptimizer}
                />
              </>
            }
            rightContent={
              <>
                <ContentoptimizerOutputs contentoptimizer={contentoptimizer} />
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
