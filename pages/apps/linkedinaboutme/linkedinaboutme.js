import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import LinkedinaboutmeInputs from "../../../src/components/apps/linkedinaboutme/linkedinaboutmeinputs";
import LinkedinaboutmeOutputs from "../../../src/components/apps/linkedinaboutme/linkedinaboutmeoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [linkedinaboutme, setLinkedinaboutme] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <LinkedinaboutmeInputs
                  setLinkedinaboutme={setLinkedinaboutme}
                />
              </>
            }
            rightContent={
              <>
                <LinkedinaboutmeOutputs linkedinaboutme={linkedinaboutme} />
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
