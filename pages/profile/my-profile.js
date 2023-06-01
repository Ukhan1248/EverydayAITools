import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import * as Icon from "react-feather";
import AccountDetails from "../../src/components/my-profile/AccountDetails";
import SubscriptionDetails from "../../src/components/my-profile/SubscriptionDetails";

const tabs = {
  //1: AccountDetails,
  1: SubscriptionDetails,
};

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState(1);

  const Tab = tabs[activeTab];

  const { data: session } = useSession();
  return (
    <div className="my-profile flex justify-between gap-30">
      <div className="sidebar">
        <ul>
          <li
            className={`${activeTab === 1 && "active"}`}
            onClick={() => setActiveTab(1)}
          >
            <Icon.User /> <span>Subscription</span>
          </li>
        </ul>
      </div>
      <div className="details">
        <Tab />
      </div>
    </div>
  );
};

export default MyProfile;

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
