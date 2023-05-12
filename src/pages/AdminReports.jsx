import React, { useState } from "react";
import { eachMonthOfInterval, startOfYear, endOfYear } from "date-fns";
import transformDate from "../utils/date.toString";
import PurchasesOverview from "../components/report/PurchasesOverview";
import SalesOverivew from "../components/report/SalesOverivew";
import useFetch from "../hooks/api/useFetch";
import ReportLogs from "../components/report/ReportLogs";
import Expenses from "../components/report/Expenses";
import ReportsTransactions from "../components/report/ReportsTransactions";
import { Icon } from "@iconify/react";
function AdminReports() {
  // get days of the month
  const [selectedDate, setSelectedDate] = useState(new Date());

  // monthds of the year
  const startYear = startOfYear(new Date());
  const endYear = endOfYear(new Date());
  const months = eachMonthOfInterval({ start: startYear, end: endYear });

  const { data, error } = useFetch({
    url: `/api/reports/purchases/${transformDate(selectedDate).y_m_d}`,
  });

  function changeYear(newSelectedYear) {
    let split_date = transformDate(selectedDate).y_m_d.split("-");
    setSelectedDate(
      new Date(`${newSelectedYear}-${split_date[1]}-${split_date[2]}`)
    );
  }

  return (
    <div className="admin-reports">
      <div className="admin-reports-header">
        <div className="admin-reports-header--query-option">
          <p className="admin-reports-header--query-option__title">Month</p>
          <select
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            name="date"
            id="date"
            className="admin-reports-header--query-option__select-date"
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
          <p className="admin-reports-header--query-option__title">Year</p>
          <select
            name=""
            id=""
            className="admin-reports-header--query-option__select-date"
            onChange={(e) => changeYear(e.target.value)}
          >
            {/* <option value="2021">2022</option> */}
            <option selected value="2023">
              2023
            </option>
          </select>
        </div>
        {/* <div className="admin-reports-header--action-buttons">
          <button className="admin-reports-header--action-buttons__export-button">
            <Icon icon="material-symbols:export-notes" /> Export
          </button>
        </div> */}
      </div>

      <div className="admin-reports--transactions">
        <ReportsTransactions date={transformDate(selectedDate).y_m_d} />
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
