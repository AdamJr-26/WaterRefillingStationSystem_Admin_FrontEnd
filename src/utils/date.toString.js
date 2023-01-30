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
  return {
    string_date: current_date,
    day,
    fullYear: date?.getFullYear(),
    month: date?.getMonth() + 1,
    monthName: monthNames[date?.getMonth()],
    monthDay: `${monthNames[date?.getMonth()]}, ${date?.getDate()}`,
    day: date?.getDate(),
    y_m_d: `${date?.getFullYear()}-${date?.getMonth() + 1}-${
      date?.getDay() + 1
    }`,
  };
}
export default transformDate;
