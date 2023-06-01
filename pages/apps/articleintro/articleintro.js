import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ArticleintroInputs from "../../../src/components/apps/articleintro/articleintroinputs";
import ArticleintroOutputs from "../../../src/components/apps/articleintro/articleintrooutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [articleintro, setArticleintro] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ArticleintroInputs setArticleintro={setArticleintro} />
              </>
            }
            rightContent={
              <>
                <ArticleintroOutputs articleintro={articleintro} />
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
