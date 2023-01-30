import React from "react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { Icon } from "@iconify/react";
import ScrollContainer from "react-indiana-drag-scroll";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
  income,
  mostRefilledGallon,
  orderAndSchedule,
  placesData,
} from "../lib/sample/data";
import AdminDashboardCard2 from "../components/AdminDashboardCard2";
function AdminDashboard() {


  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard--greeting">
        <p className="admin-dashboard--greeting__greeting">
          Good morning, Boss!
        </p>
        <p className="admin-dashboard--greeting__date">October 3,2022</p>
      </div>

      
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
