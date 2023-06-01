import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ArticletitleInputs from "../../../src/components/apps/articletitle/articletitleinputs";
import ArticletitleOutputs from "../../../src/components/apps/articletitle/articletitleoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [articletitle, setArticletitle] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ArticletitleInputs setArticletitle={setArticletitle} />
              </>
            }
            rightContent={
              <>
                <ArticletitleOutputs articletitle={articletitle} />
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
