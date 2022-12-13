import React, { useState } from "react";

function SelectDate({ label, placeholder, ...props }) {
  return (
    <div>
      <label for={label}>{label}:</label>
      <input type="date" id={label} name={label}></input>
    </div>
  );
}

export default SelectDate;
