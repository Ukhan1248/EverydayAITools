import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import ProcessPayment from "../../../component/processPayment/ProcessPayment";

const PurchasePackage = () => {
  const [selectPackage, setSelectPackage] = useState({});

  const { data: session } = useSession();

  // handle payment
  const handlePaymentSuccess = async ({ card, id: stripeToken }) => {
    console.log("card", card);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeToken,
        price: selectPackage?.price,
        email: session?.user?.email,
        packageName: selectPackage?.name,
        tokens: Number(selectPackage?.tokens),
        brand: card?.brand,
        last4: card?.last4,
      }),
    };

    await fetch(`http://localhost:3000/api/purchase-package`, options)
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data?._id) {
            setSelectPackage({});
          }
        }
      });
  };
  return (
    <>
      <div className="flex items-center justify-center h-full flex-col">
        <h2 className="purchase-heading">
          Purchase the plan that suits your Needs!
        </h2>
        <div className="grid grid-cols-2 gap-30 w-70 ">
          <div className="package-box">
            <h3>Basic Plan</h3>
            <ul>
              <li>$14.99</li>
              <li>250 Responses</li>
              <li>Blogger/Writer AI Tools</li>
              <li>HR/Job Search AI Tools</li>
              <li>Marketing AI Tools</li>
            </ul>
            {/* <a href="https://buy.stripe.com/14k6q12DP2eafIYcMM">Buy Now</a> */}
            <button
              onClick={() =>
                setSelectPackage({
                  id: 3,
                  name: "basic",
                  price: 14.99,
                  tokens: 250,
                })
              }
            >
              Buy Now
            </button>
          </div>
          <div className="package-box">
            <h3>Silver Plan</h3>
            <ul>
              <li>$24.99</li>
              <li>500 Responses</li>
              <li>Blogger/Writer AI Tools</li>
              <li>HR/Job Search AI Tools</li>
              <li>Marketing AI Tools</li>
            </ul>
            {/* <a href="https://buy.stripe.com/14k6q12DP2eafIYcMM">Buy Now</a> */}
            <button
              onClick={() =>
                setSelectPackage({
                  id: 3,
                  name: "silver",
                  price: 24.99,
                  tokens: 500,
                })
              }
            >
              Buy Now
            </button>
          </div>
          <div className="package-box">
            <h3>Gold Plan</h3>
            <ul>
              <li>$34.99</li>
              <li>1000 Responses</li>
              <li>Blogger/Writer AI Tools</li>
              <li>HR/Job Search AI Tools</li>
              <li>Marketing AI Tools</li>
            </ul>
            <button
              onClick={() =>
                setSelectPackage({
                  id: 3,
                  name: "gold",
                  price: 34.99,
                  tokens: 1000,
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ scale: selectPackage?.id ? "100%" : 0, transition: ".3s" }}
        className="paymentBox"
      >
        <div className="paymentItem">
          <GrClose className="close" onClick={() => setSelectPackage({})} />
          <div className="packageDetails">
            <h3>Package Name: {selectPackage?.name}</h3>
            <h3>Price: ${selectPackage?.price}</h3>
            <h3>Tokens: {selectPackage?.tokens}</h3>
          </div>
          <ProcessPayment handlePayment={handlePaymentSuccess} />
        </div>
      </div>
    </>
  );
};

export default PurchasePackage;

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
