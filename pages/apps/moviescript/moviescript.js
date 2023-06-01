import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import MoviescriptInputs from "../../../src/components/apps/moviescript/moviescriptinputs";
import MoviescriptOutputs from "../../../src/components/apps/moviescript/moviescriptoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [moviescript, setMoviescript] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <MoviescriptInputs setMoviescript={setMoviescript} />
              </>
            }
            rightContent={
              <>
                <MoviescriptOutputs moviescript={moviescript} />
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
