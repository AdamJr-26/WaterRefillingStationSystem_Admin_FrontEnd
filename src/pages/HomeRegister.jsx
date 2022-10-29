import React, { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminTextinput from "../components/AdminTextinput";
import Map from "../components/Map";
import { axios } from "../lib/utils/axios";
import ErrorModal from "../components/ErrorModal";

function HomeRegister() {
  const [registerFormData, setRegisterFormData] = React.useState({
    geolocation: {
      lat: "",
      lng: "",
    },
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // #################################  onSignupSubmit ##################################################
  const onSignupSubmit = (e) => {
    e.preventDefault();
    if (registerFormData.password !== registerFormData.confirm_password) {
      setErrorMessage("Password did not match");
    }
    else if(registerFormData.password?.length < 6){
      setErrorMessage("Password Should be atleast 6 combination letters and numbers");
    }
    else if(registerFormData.wrss_name?.length > 0){
      setErrorMessage(`Please fill up all required field, with asterisk(*) ${registerFormData.wrss_name}`);
    }
    else {
      axios({
        url: "auth/register/station",
        method: "post",
        withCredentials: true,
        data: registerFormData,
      })
        .then((res) => {
          const data = res.data;
          console.log("data", data);
          if (data?.data?.success) {
            navigate("/redirect-register");
          } else if (data.emailExists) {
            setErrorMessage(data.message);
            console.log("errorMessage", errorMessage);
          }
        })
        .catch((err) => {
          // setError
          console.log("errr by registering wrs", err);
        });
    }
  };

  return (
    <div onSubmit={onSignupSubmit} className="home-register">
      <form className="home-register--steps" action="post">
        {/* https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd */}
        {/* pass form in outlet  */}
        <Outlet context={[registerFormData, setRegisterFormData]} />
      </form>

      <div className="home-register--map">
        <div className="home-register--map__header">
          <p>Mark your location*</p>
          <p>
            By marking your location you are helping the customers to easily
            find your Water Refilling Station
          </p>
          <p>Step 1: Click the map to find your location</p>
          <p>Step 2: Drag the marker to manually set position</p>
        </div>
        <Map formData={registerFormData} />
      </div>
      {errorMessage ? (
        <ErrorModal message={errorMessage} setClose={setErrorMessage} />
      ) : null}
    </div>
  );
}

export default HomeRegister;
