import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileLayout from "./ProfileLayout";

const SubscriptionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const { data: session } = useSession();
  const { email } = session?.user || {};
  const [remainingDays, setRemainingDays] = useState(0);
  const [cancelBox, setCancelBox] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState("");

  // get user data
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user?._id) {
      // Get the current date
      const currentDate = new Date();
      const differenceMs =
        user?.package === "free"
          ? Number(user?.trialEnd) - currentDate.getTime()
          : Number(user?.packageEnd) - currentDate.getTime();
      const differenceDays = Math.ceil(differenceMs / (24 * 60 * 60 * 1000));

      setRemainingDays(differenceDays);
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/users/${email}`);
      const json = await res.json();

      setUser(json);
    }

    fetchData();
  }, [session]);

  // get all transactions
  const getData = async () => {
    try {
      const res = await axios.get(`/api/transactions/${email}`);

      if (res) {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [session]);

  // cancel subscriptions
  const cancelSubscriptions = async () => {
    try {
      const response = await axios.patch(`/api/users/${email}`);

      if (response?.data?._id) {
        setCancelSuccess(true);
        setUser(response?.data);

        setTimeout(() => {
          setCancelBox(false);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ProfileLayout heading="Subscription Details/Purchase History">
      <div className="subscription-details">
        <div className="plan-details">
          <h2>Plan Details</h2>
          <div className="plan-desc">
            <div>
              <span>Your Plan :</span>
              <h4>{user?.package}</h4>
            </div>
            <div>
              {/* <h4>{moment(Number(1680625936104)).format("MMM Do YY")}</h4> */}
              {user?.package === "free" && (
                <>
                  <span>Remaining Trial Days :</span>
                  <h4>
                    {String(remainingDays)?.includes("-")
                      ? "Trial End"
                      : `${remainingDays} Days`}
                  </h4>
                </>
              )}
            </div>
            <div>
              <span>Available Responses :</span>
              <h4>{user?.tokens}</h4>
            </div>
          </div>
        </div>
        <div className="trans-history">
          {transactions?.map(transaction => (
            <div key={transaction?._id} className="single-trans">
              <h3>{transaction?.description}</h3>
              <div className="trans-info">
                <h4>${transaction?.amount}</h4>
                <span>
                  {moment(Number(transaction?.createdDate)).format("MMM Do YY")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* subscription cancallation confirmation popup */}
      <div
        className="subscription-cancel"
        style={cancelBox ? { scale: "1" } : { scale: "0" }}
      >
        <div className="confirmation">
          <h3>Are you sure? Will you cancel your current subscription?</h3>
          <div className="buttons">
            <button className="confirm" onClick={cancelSubscriptions}>
              Yes
            </button>
            <button className="cancel" onClick={() => setCancelBox(false)}>
              No
            </button>
          </div>
          {cancelSuccess && (
            <p className="success">Your Subscription Cancel Successfully.</p>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default SubscriptionDetails;
