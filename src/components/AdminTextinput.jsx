import React from "react";
import { useState } from "react";

function AdminTextinput({
  label,
  type,
  inputValue,
  setValue,
  isDisabled,
  name,
  isRequired,
}) {
  // just for animation of an input, do not remove.
  const placeholder = " ";
  
  const onTextChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValue((preValue) => {
      return {
        ...preValue,
        [name]: type === "checkbox"? checked: value
      }
    });
  };
  return (
    <div className="textinput">
      <input
        name={name}
        label={label}
        className="textinput--input"
        placeholder={placeholder}
        type={type}
        required={isRequired}
        autoComplete="off"
        value={inputValue}
        onChange={onTextChange}
        disabled={isDisabled}
        // required
      />
      {/* <input
        ref={inputRef}
        name={label}
        className="textinput--input"
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        // value={value}
        // onChange={(event)=>setValue(event.target.value)}
        disabled={isDisabled}
        // required
      /> */}
      <label htmlFor={label} className="textinput--label" autoComplete="off">
        <span className="content-name">{label}</span>
        {/* {label} */}
      </label>
    </div>
  );
}
AdminTextinput.defaultProps = {
  value: "",
};
export default AdminTextinput;
