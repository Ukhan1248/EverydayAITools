import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import RecruiterresponseInputs from "../../../src/components/apps/recruiterresponse/recruiterresponseinputs";

import RecruiterresponseOutputs from "../../../src/components/apps/recruiterresponse/recruiterresponseoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [recruiterresponse, setRecruiterresponse] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <RecruiterresponseInputs
                  setRecruiterresponse={setRecruiterresponse}
                />
              </>
            }
            rightContent={
              <>
                <RecruiterresponseOutputs
                  recruiterresponse={recruiterresponse}
                />
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
