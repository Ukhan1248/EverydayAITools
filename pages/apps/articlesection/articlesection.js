import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ArticlesectionInputs from "../../../src/components/apps/articlesection/articlesectioninputs";
import ArticlesectionOutputs from "../../../src/components/apps/articlesection/articlesectionoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [articlesection, setArticlesection] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ArticlesectionInputs setArticlesection={setArticlesection} />
              </>
            }
            rightContent={
              <>
                <ArticlesectionOutputs articlesection={articlesection} />
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
