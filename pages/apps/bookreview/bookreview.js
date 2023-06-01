import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import BookreviewInputs from "../../../src/components/apps/bookreview/bookreviewinputs";
import BookreviewOutputs from "../../../src/components/apps/bookreview/bookreviewoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [bookreview, setBookreview] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <BookreviewInputs setBookreview={setBookreview} />
              </>
            }
            rightContent={
              <>
                <BookreviewOutputs bookreview={bookreview} />
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
