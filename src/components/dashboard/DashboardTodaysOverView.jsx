import React from "react";
import { Icon } from "@iconify/react";
function DashboardTodaysOverView() {
  return (
    <div className="dashboard-todays-overview">
      {/* <div className="dashboard-todays-overview--header">
        <p>Overview</p>
      </div> */}
      <div className="dashboard-todays-overview--profit-wrapper">
        <div className="dashboard-todays-overview--profit-wrapper__content">
          <p>Today's profit</p>
          <p>₱ 2,454</p>
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
            <p>₱ 2415</p>
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
            <p>P 2415</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTodaysOverView;
