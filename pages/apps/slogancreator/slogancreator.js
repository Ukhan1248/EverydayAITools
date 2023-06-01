import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import SlogancreatorInputs from "../../../src/components/apps/slogancreator/slogancreatorinputs";
import SlogancreatorOutputs from "../../../src/components/apps/slogancreator/slogancreatoroutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [slogan, setSlogan] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <SlogancreatorInputs setSlogan={setSlogan} />
              </>
            }
            rightContent={
              <>
                <SlogancreatorOutputs slogan={slogan} />
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
