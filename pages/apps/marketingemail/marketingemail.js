import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import MarketingemailInputs from "../../../src/components/apps/marketingemail/marketingemailinputs";
import MarketingemailOutputs from "../../../src/components/apps/marketingemail/marketingemailoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [marketingemail, setMarketingemail] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <MarketingemailInputs setMarketingemail={setMarketingemail} />
              </>
            }
            rightContent={
              <>
                <MarketingemailOutputs marketingemail={marketingemail} />
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
