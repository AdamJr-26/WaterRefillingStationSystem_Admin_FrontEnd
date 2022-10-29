import React from "react";
import { Icon } from "@iconify/react";

function ErrorModal({ message, setClose }) {
  return (
    <div className="error-modal">
      <Icon className="error-modal--icon" icon="ant-design:warning-filled" />
      <p className="error-modal--message">{message}</p>
      <button onClick={()=>setClose(null)} className="error-modal--button">Ok</button>
    </div>
  );
}

export default ErrorModal;
