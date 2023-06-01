import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ProductdescriptionInputs from "../../../src/components/apps/productdescription/productdescriptioninputs";
import ProductdescriptionOutputs from "../../../src/components/apps/productdescription/productdescriptionoutputs";

import { getSession } from "next-auth/react";
import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [productdescription, setProductdescription] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ProductdescriptionInputs
                  setProductdescription={setProductdescription}
                />
              </>
            }
            rightContent={
              <>
                <ProductdescriptionOutputs
                  productdescription={productdescription}
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
