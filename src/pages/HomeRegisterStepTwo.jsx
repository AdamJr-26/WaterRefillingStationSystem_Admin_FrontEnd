import React from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "@iconify/react";

import TextInput from "../components/general/TextInput";
import TextInputPassword from "../components/TextInputPassword";
import TextInputSelect from "../components/general/TextInputSelect";
import SelectDate from "../components/general/SelectDate";

function HomeRegisterStepTwo() {
  const selectGenderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="home-register--steps__two">
      <NavLink className="back" to="/register">
        <Icon icon="akar-icons:arrow-back-thick" /> Back
      </NavLink>
      <p className="title">Create an Account</p>
      <p className="detail">
        Register your water refilling business and use our system for free
      </p>
      <TextInput
        label="Gmail"
        name="gmail"
        type="text"
        placeholder="sample@gmail.com"
      />
      <TextInput
        label="Contact Number"
        name="contact_number"
        type="number"
        placeholder="09XXXXXXXXX"
      />
      <TextInput
        label="Firstname"
        name="firstname"
        type="text"
        placeholder="Juan"
      />
      <TextInput
        label="Lastname"
        name="lastname"
        type="text"
        placeholder="Dela Cruz"
      />
      <TextInputSelect
        label="Gender"
        name="gender"
        selectValues={selectGenderOptions}
      />
      <TextInput
        label="Birthday"
        name="birthday"
        type="date"
        placeholder="birthday"
      />
      <TextInputPassword
        label="Password"
        name="password"
        placeholder="Password"
      />
      <TextInputPassword
        label="Confirm Password"
        name="confirm_password"
        placeholder="Confirm Password"
      />
      <button className="register-admin-submit" type="submit">
        Submit
      </button>
    </div>
  );
}

export default HomeRegisterStepTwo;
