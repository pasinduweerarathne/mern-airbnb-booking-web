import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Places from "./Places";
import AccountNav from "../components/AccountNav";

const Account = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/user/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Account;
