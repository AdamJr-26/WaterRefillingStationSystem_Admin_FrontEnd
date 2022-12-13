import React from "react";
import { Select } from "@chakra-ui/react";
import timezones from "../../config/timezones";
function DateTime() {
  var dateIns = new Date("2022-12-08T22:48:54.210+00:00");
  let hours;
  var ampm = dateIns.getHours() > 12 ? " PM" : " AM";
  hours = dateIns.getHours() % 12;
  hours = hours ? hours : 12;

  var date =
    dateIns.getMonth() +
    1 +
    "/" +
    dateIns.getDay() +
    "/" +
    dateIns.getFullYear();
  var day =
    hours +
    ":" +
    dateIns.getMinutes() +
    ":" +
    dateIns.getSeconds() +
    ":" +
    ampm;

  return (
    <div className="datetime-wrapper">
      <div className="datetime-wrapper--date-time">
        <div className="datetime-wrapper--date-time__date">
          <p>{date}</p>
        </div>
        <div className="datetime-wrapper--date-time__time">
          <p>{day}</p>
        </div>
      </div>
      {/* <div className="datetime-wrapper--select-timezone">
        <Select
          defaultChecked={"Asia/Manila"}
          placeholder="Select option"
          className="datetime-wrapper--select-timezone__select"
        >
          {timezones()?.map((timezone, i) => (
            <option key={i} defaultChecked={true} value={timezone}>
              {timezone?.name}
            </option>
          ))}
        </Select>
      </div> */}
    </div>
  );
}

export default DateTime;
