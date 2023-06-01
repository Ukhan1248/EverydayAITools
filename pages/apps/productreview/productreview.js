import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ProductreviewInputs from "../../../src/components/apps/productreview/productreviewinputs";
import ProductreviewOutputs from "../../../src/components/apps/productreview/productreviewoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [productreview, setProductreview] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ProductreviewInputs setProductreview={setProductreview} />
              </>
            }
            rightContent={
              <>
                <ProductreviewOutputs productreview={productreview} />
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
