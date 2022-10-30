import React from "react";
import Select from "react-select";
import { useField, ErrorMessage, Field } from "formik";

function TextInputSelect({ selectValues, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="textinput-select-wrapper">
      <label htmlFor={props.name} className="textinput-select-wrapper--label">
        {props.label}
      </label>
      <select
        className="textinput-select-wrapper__select"
        name={props.name}
        {...field}
        {...props}
      >
        {selectValues?.map((value, i) => (
          <option
            className="textinput-select-wrapper__options"
            key={i}
            value={value.value}
          >
            {value.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TextInputSelect;
