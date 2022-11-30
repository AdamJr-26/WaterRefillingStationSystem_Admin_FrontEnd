import React, { useEffect, useState } from "react";
import fetcher from "./fetcher";
import handleError from "../../services/axios.handleError";
import useSWR from "swr";

function useProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: userProfile, error: userProfileError } = useSWR(
    "/api/admin/profile",
    fetcher
  );
  
  useEffect(() => {
    function handleChanges() {
      setIsLoading(false);
    //   const statusCode = userProfileError?.response?.status;
    //   handleError(statusCode);
    }
    handleChanges();
  }, [userProfile]);
  return {isLoading, userProfile, userProfileError};
}

export default useProfile;
