import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminTextinput from "../components/AdminTextinput";
import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "react-select";

function HomeRegisterStepTwo() {
  const [registerFormData, setRegisterFormData] = useOutletContext();
  const showPasswordRef = useRef(null);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const togglePasswordShow = () => {
    showPasswordRef.current.click();
    setIsPasswordShown(showPasswordRef.current.checked);
  };
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  useEffect(() => {
    if (
      registerFormData?.confirm_password === registerFormData.passsword &&
      registerFormData?.confirm_password &&
      registerFormData?.passsword
    ) {
      setIsPasswordMatched(true);
    } else {
      setIsPasswordMatched(false);
    }
  }, [registerFormData.confirm_password, registerFormData.passsword]);

  const selectGenderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const onChangeGenderSelect = (selected) => {
    registerFormData.gender = selected.value
  };
  return (
    <div className="home-register--steps__two">
      <NavLink className="back" to="/register">
        <Icon icon="akar-icons:arrow-back-thick" /> Back
      </NavLink>
      <p className="title">Create an Account</p>
      <p className="detail">
        Register your water refilling business and use our system for free
      </p>

      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.gmail}
        label="Gmail*"
        name="gmail"
        isRequired={true}
        type="email"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.contact_number}
        label="Contact Number"
        name="contact_number"
        type="number"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.firstname}
        label="Firstname*"
        name="firstname"
        isRequired={false}
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.lastname}
        label="Lastname "
        name="lastname"
        isRequired={false}
      />
      <div style={{ height: "50px", display: "flex", alignItems: "center", width: "100%", gap:10}}>
        <p>Gender</p>
        <Select
          styles={{ height: "100%"}}
          defaultValue={selectGenderOptions[0]}
          options={selectGenderOptions}
          onChange={onChangeGenderSelect}
        />
      </div>
      {/* <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.gender}
        label="Gender"
        name="gender"
      /> */}
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.age}
        label="Age"
        name="age"
        type="number"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.passsword}
        label="Password*"
        name="password"
        isRequired={true}
        type={isPasswordShown ? "text" : "password"}
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData.confirm_password}
        label="Confirm password*"
        name="confirm_password"
        isRequired={true}
        type={isPasswordShown ? "text" : "password"}
      />
      <p
        style={{
          display: "flex",
          alignItems: "center",
          color: "gray",
          gap: "5px",
          fontSize: "12px",
          margin: 0,
        }}
      >
        <Icon icon="ant-design:exclamation-circle-outlined" /> Password must
        aleast 6 letters and numbers.
      </p>
      {isPasswordMatched ? (
        <div
          style={{ margin: 0, display: "flex", gap: 10, alignItems: "center" }}
        >
          <Icon
            icon="akar-icons:circle-check-fill"
            style={{ color: "#2389DA", fontSize: 22 }}
          />
          <p>Password Matched</p>
        </div>
      ) : (
        <div></div>
      )}
      <div
        style={{
          margin: 0,
          display: "flex",
          gap: 10,
          color: "#2389DA",
          cursor: "pointer",
        }}
        onClick={togglePasswordShow}
      >
        <input
          style={{ width: 20, margin: 0 }}
          type="checkbox"
          name="checkbox"
          id="checkbox"
          ref={showPasswordRef}
        />
        <p style={{ fontWeight: 500 }}>Show Password</p>
      </div>
      <button type="submit">Submit</button>
    </div>
  );
}

export default HomeRegisterStepTwo;
