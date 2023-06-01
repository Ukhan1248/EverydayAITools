import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import SocialmediaInputs from "../../../src/components/apps/socialmediapost/socialmediainputs";
import SocialmediaOutputs from "../../../src/components/apps/socialmediapost/socialmediaoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [socialmedia, setSocialmedia] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <SocialmediaInputs setSocialmedia={setSocialmedia} />
              </>
            }
            rightContent={
              <>
                <SocialmediaOutputs socialmedia={socialmedia} />
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
