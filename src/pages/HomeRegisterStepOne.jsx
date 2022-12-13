import React, { useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TextInput from "../components/general/TextInput";

function HomeRegisterStepOne() {
  return (
    <div className="home-register--steps__one">
      <p className="title">Create an Account</p>
      <p className="detail">
        Register your water refilling business and use our system for free
      </p>
      <TextInput
        label="WRS Name"
        name="wrs_name"
        type="text"
        placeholder="WRS Name"
      />
      <p className="address">Complete Address *</p>
      <TextInput
        label="Region"
        name="region"
        type="text"
        placeholder="ex. NCR"
      />
      <TextInput
        label="Province"
        name="province"
        type="text"
        placeholder="Province"
      />
      <TextInput label="City" name="city" type="text" placeholder="city" />
      <TextInput
        label="Barangay"
        name="barangay"
        type="text"
        placeholder="Barangay"
      />

      <TextInput label="Street, Building no." name="street_building" type="text" placeholder="#506 Sampple, Address" />
      <NavLink className="next" to="step-2">
        <span>Next</span>
      </NavLink>
    </div>
  );
}

export default HomeRegisterStepOne;
