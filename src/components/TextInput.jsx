import React from "react";
import { useField, ErrorMessage } from "formik";

function TextInput({ label,placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="textinput">
      <label className="textinput--label" htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`textinput--input ${meta.touched && meta.error && "textinput--input-err"}`}
        autoComplete="off"
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <ErrorMessage component="div"  className="text-input-error" name={field.name} />
    </div>
  );
}

export default TextInput;
