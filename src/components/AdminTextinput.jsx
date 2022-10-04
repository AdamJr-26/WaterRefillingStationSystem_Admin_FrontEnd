import React from "react";
import { useState } from "react";

function AdminTextinput({ label, type, value, setValue, isDisabled }) {
  const placeholder = " ";
  // const [inputValue, setInputValue] = useState(value)
  return (
    <div className="textinput">
      <input
        name={label}
        className="textinput--input"
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        value={value}
        onChange={(event)=>setValue(event.target.value)}
        disabled={isDisabled}
        // required
      />
      <label htmlFor={label} className="textinput--label" autoComplete="off"  >
        <span className="content-name">{label}</span>
        {/* {label} */}
      </label>
    </div>
  );
}
AdminTextinput.defaultProps = {
  value: ""
}
export default AdminTextinput;
