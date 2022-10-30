import React from "react";
import { useField, ErrorMessage } from "formik";
import { Icon } from "@iconify/react";

function TextInputPassword({ label, placeholder, ...props }) {
  const [field, meta] = useField(props);
  const [show, setShown] = React.useState(false);
  const toggleType = () => {
    setShown(!show);
  };
  React.useEffect(()=>{
    if(show){
      setTimeout(()=>setShown(!show), 3000)
    }
  },[show])
  return (
    <div className="textinput-password">
      <label className="textinput--label" htmlFor={field.name}>
        {label}
      </label>
      <div className="textinput-password--field">
        <input
          className={`textinput-password--field__input ${
            meta.touched &&
            meta.error &&
            "textinput-password--field__input-error"
          }`}
          autoComplete="off"
          placeholder={placeholder}
          {...field}
          {...props}
          type={show? "text": "password"}
        />
        <button type="button"
          onClick={toggleType}
          className="textinput-password--field__icon"
        >
          {show ? (
            <Icon icon="bx:lock-open" color="gray" />
          ) : (
            <Icon icon="bx:lock" color="gray" />
          )}
        </button>
      </div>
      <ErrorMessage
        component="div"
        className="text-input-error"
        name={field.name}
      />
    </div>
  );
}

export default TextInputPassword;
