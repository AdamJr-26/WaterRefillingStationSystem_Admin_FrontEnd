import React from "react";

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
    console.log("event", event.target.value);
    const { name, value, type, checked } = event.target;
    setValue(value);
  };
  return (
    <div className="textinput-div">
      <label htmlFor={label} className="textinput-div--label">
        <span className="content-name">{label}</span>
      </label>
      <input
        name={name}
        label={label}
        className="textinput-div--input"
        placeholder={placeholder}
        type={type}
        required={isRequired}
        autoComplete="off"
        value={inputValue}
        onChange={(e) => onTextChange(e)}
        disabled={isDisabled}
      />
    </div>
  );
}
AdminTextinput.defaultProps = {
  value: "",
};

export default AdminTextinput;
