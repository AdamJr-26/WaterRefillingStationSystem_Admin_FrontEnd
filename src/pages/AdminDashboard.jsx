import React from "react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { Icon } from "@iconify/react";
import ScrollContainer from "react-indiana-drag-scroll";

import { Bar, Line, Pie } from "react-chartjs-2";
import DashboardTodaysOverView from "../components/dashboard/DashboardTodaysOverView";
import DashboardEngagementCustomers from "../components/dashboard/DashboardEngagementCustomers";
import DailySalesOverview from "../components/dashboard/DailySalesOverview";
import { format, sub } from "date-fns";
import ControlsWrapper from "../components/dashboard/ControlsWrapper";
function AdminDashboard() {
  const date = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(sub(new Date(), { days: 1 }), "yyyy-MM-dd");
  const formattedDateToday = format(new Date(), "MMM-dd-yyyy");
  const formattedDateYesterday = format(
    sub(new Date(), { days: 1 }),
    "MMM-dd-yyyy"
  );
  return (
    <div className="admin-dashboard">
      <p className="admin-dashboard--title">Daily Sales</p>
      <p className="admin-dashboard--description">
        The sales and expenses statuses were compared between today and
        yesterday ({formattedDateYesterday + " - " + formattedDateToday}).
      </p>
      <div className="admin-dashboard--overview">
        {/* <DashboardTodaysOverView /> */}
        <DailySalesOverview />
      </div>
      <div className="admin-dashboard--engagements">
        <p className="admin-dashboard--title">Controls</p>
        <p className="admin-dashboard--description">
          While you are away, you still maintain some control over your
          business.
        </p>

        <ControlsWrapper />
      </div>
      {/* <div className="admin-dashboard--responses">
        <p className="admin-dashboard--overview__title">Responses</p>
      </div> */}
    </div>
  );
}

export default AdminDashboard;

// some charts content

// 1. monthly income,
// 2. monthly expenses
// 2.1 total discounts
// 3. places kung saan sila maraming customer
// 4. most sold/bought product?
// 5. anong mabentang product.
