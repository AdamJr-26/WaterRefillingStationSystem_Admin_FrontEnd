import React, { useState } from "react";
import { eachMonthOfInterval, startOfYear, endOfYear } from "date-fns";
import transformDate from "../utils/date.toString";
import PurchasesOverview from "../components/report/PurchasesOverview";
import SalesOverivew from "../components/report/SalesOverivew";
import useFetch from "../hooks/api/useFetch";
import ReportLogs from "../components/report/ReportLogs";
import Expenses from "../components/report/Expenses";
function AdminReports() {
  // get days of the month
  const [selectedDate, setSelectedDate] = useState(new Date());

  // monthds of the year
  const startYear = startOfYear(new Date());
  const endYear = endOfYear(new Date());
  const months = eachMonthOfInterval({ start: startYear, end: endYear });
  console.log("months", months);

  const { data, error } = useFetch({
    url: `/api/reports/purchases/${transformDate(selectedDate).y_m_d}`,
  });
  console.log("[PURCHASES-REPORTS]ss", data);

  return (
    <div className="admin-reports">
      <div className="admin-reports--query-option">
        <p className="admin-reports--query-option__title">
          Sales report / Overview /
        </p>
        <select
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          name="date"
          id="date"
          className="admin-reports--query-option__select-date"
        >
          {months.map((date, i) =>
            new Date().getMonth() + 1 === transformDate(date).month ? (
              <option selected key={i} value={date}>
                {transformDate(date).monthName}
              </option>
            ) : (
              <option key={i} value={date}>
                {transformDate(date).monthName}
              </option>
            )
          )}
        </select>
        <select name="" id="">
          <option value="2022">2022</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div className="admin-reports-wrapper-for-charts-logs">
        <div className="admin-reports--charts">
          <div className="admin-reports--charts__item">
            <SalesOverivew selectedDate={selectedDate} data={data} />
          </div>
          <div className="admin-reports--charts__item">
            <Expenses selectedDate={selectedDate} data={data} />
            <PurchasesOverview selectedDate={selectedDate} data={data} />
          </div>
        </div>
        {/* <div className="admin-reports--logs">
          <div className="admin-reports--logs__header">
            <p>Credits</p>
          </div>
          <div>
            <ReportLogs data={data} selectedDate={selectedDate} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminReports;
