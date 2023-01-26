function transformDate(date_str) {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(date_str);
  const current_date = `${
    monthNames[date?.getMonth()]
  }, ${date?.getDate()}, ${date?.getFullYear()}`;
  const day = weekdays[date?.getDay()];
  return { string_date: current_date, day };
}
export default transformDate;
