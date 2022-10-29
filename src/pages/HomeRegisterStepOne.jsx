import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import { Icon } from "@iconify/react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdminTextinput from "../components/AdminTextinput";
function HomeRegisterStepOne() {
  const [registerFormData, setRegisterFormData] = useOutletContext();
  return (
    <div className="home-register--steps__one">
      <p className="title">Create an Account</p>
      <p className="detail">
        Register your water refilling business and use our system for free
      </p>
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.wrs_name}
        label="WRSS Name*"
        name="wrs_name"
        isRequired={true}
      />
      <p className="address">Complete Address *</p>
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.region}
        label="Region"
        name="region"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.province}
        label="Province"
        name="province"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.city}
        label="City"
        name="city"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.barangay}
        label="Barangay"
        name="barangay"
      />
      <AdminTextinput
        setValue={setRegisterFormData}
        value={registerFormData?.street_building_house_no}
        label="Street name, building, house no."
        name="street_building_house_no"
      />
      <NavLink className="next" to="step-2">
        <span>Next</span>
      </NavLink>
    </div>
  );
}

export default HomeRegisterStepOne;
