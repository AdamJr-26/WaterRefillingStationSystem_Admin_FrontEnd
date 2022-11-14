import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axios } from "../services/axios";

function VerifyPage() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(null);
  const [error, setError] = useState(null);
  const id = searchParams.get("id");

  useEffect(() => {
    axios({
      url: `auth/verify-admin?id=${id}`,
      method: "get",
      withCredentials: true,
    })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          console.log(data.code)
          navigate("/login");
        } else if (data.code === 201) {
          console.log(data.code)
          setIsVerified(data);
        } else if (data.code === 400 && data.code === 401) {
          console.log(data.code)
          setError(data);
        }
      })
      .catch((err) => {
        setError(err);
        console.log("errr by verifying wrs", err);
      });
      return ()=>{
        setIsVerified(null);
        setError(null);
      }
  }, []);
  //     pseudo.
  // onload get the params and put it to the fetch
  // server will verify the id of the user
  // if success verified page will return
  // if did not success page will be "invalid"
  // if loading the, the "verifying" will return
  // if account is already verified before it will redirect to login.


  // bug: this useEffect render/called twice.
  // the link below is informative but still can't solve the problem.
  // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar


  if (!isVerified && !error) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <h1 style={{ color: "#0087F6" }}>Verifying....</h1>
        <p>If it's stucked in verifying, please refresh your browser.</p>
      </div>
    );
  } else if (isVerified) {
    // check if the response is success true or false;

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <Icon
          style={{ fontSize: "80px", color: "#0087F6" }}
          icon="ant-design:check-circle-filled"
        />
        <h1>Verified</h1>
        <p style={{ textAlign: "center" }}>
          Yahoo You have successfully verified the account.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#0087F6",
            border: "none",
            padding: "10px 20px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login now
        </button>
      </div>
    );
  } else if (!isVerified && error) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <Icon
          style={{ fontSize: "80px", color: "#d9534f" }}
          icon="bi:x-circle-fill"
        />
        <h1>Verify Failed</h1>
        <p style={{ textAlign: "center" }}>Your account cannot verify.</p>
      </div>
    );
  }
}

export default VerifyPage;
