import React from "react";
import { axios } from "../lib/utils/axios";
// we can use redux here to get user credential after logging in.


function useAuth() {
  const [isAuthorized, setIsAuthorized] = React.useState({authorized: false, loading: true});
  React.useEffect(() => {
    axios({
      url: "/auth/authorize-me",
      method: "get",
      withCredentials: true,
    })
      .then((res) => {
        console.log("authorizing",res.data);
        setIsAuthorized({authorized:res.data?.data?.authorized, loading: false})
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("isAuthorized", isAuthorized)
  // check if user is authenticated.
  return isAuthorized;
}

export default useAuth;
