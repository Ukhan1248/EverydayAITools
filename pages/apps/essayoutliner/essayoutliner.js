import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import EssayInputs from "../../../src/components/apps/essayoutliner/essayinputs";
import EssayOutputs from "../../../src/components/apps/essayoutliner/essayoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [essayoutline, setEssayoutline] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <EssayInputs setEssayoutline={setEssayoutline} />
              </>
            }
            rightContent={
              <>
                <EssayOutputs essayoutline={essayoutline} />
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
