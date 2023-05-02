import React from "react";
import { Icon } from "@iconify/react";
import useFetch from "../../hooks/api/useFetch";
import { format } from "date-fns";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
// this component not been used and also the css.
function DashboardTodaysOverView() {
  const date = format(new Date(), "yyyy-MM-dd");
  const { data, error, mutate, isLoading, isValidating } = useFetch({
    url: `/api/dashboard/todays-progress/${date}`,
  });
  console.log("[data-----------]", data);
  console.log("[error-----------]", error);
  let cash_received = "";
  let sales = "";
  let expenses = "";
  if (data && !error) {
    cash_received = data?.data[0]?.paidProducts;
    sales = data?.data[0]?.total_sales;
    expenses = data?.data[0]?.total_expenses;
  }
  return (
    <div className="dashboard-todays-overview">
      {/* <div className="dashboard-todays-overview--header">
        <p>Overview</p>
      </div> */}
      <div className="dashboard-todays-overview--profit-wrapper">
        <div className="dashboard-todays-overview--profit-wrapper__content">
          <p>Today's Cash Received</p>
          <p>₱ {cash_received || 0}</p>
        </div>
        <div className="dashboard-todays-overview--profit-wrapper__buttons">
          <button>button 1</button>
          <button>button 1</button>
        </div>
      </div>
      <div className="dashboard-todays-overview--sales-expenses">
        <div className="dashboard-todays-overview--sales-expenses__sales">
          <div>
            <p>
              <Icon icon="ic:baseline-arrow-circle-up" />
            </p>
          </div>
          <div>
            <p>Sales</p>
            <p>₱ {sales || 0} </p>
          </div>
        </div>
        <div className="dashboard-todays-overview--sales-expenses__expenses">
          <div>
            <p>
              <Icon icon="ic:outline-arrow-circle-down" />
            </p>
          </div>
          <div>
            <p>Expenses</p>
            <p>P {expenses || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTodaysOverView;
