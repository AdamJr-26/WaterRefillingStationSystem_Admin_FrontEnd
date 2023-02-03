import React from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from "date-fns";
import { Bar, Line, Pie, Polar, Radar, Doughnut } from "react-chartjs-2";
import transformDate from "../../utils/date.toString";
function DashboardEngagementCustomers() {
  // monthds of the year
  const startYear = startOfYear(new Date());
  const endYear = endOfYear(new Date());
  const months = eachMonthOfInterval({ start: startYear, end: endYear });

  // places radar
  const placesRadarData = {
    labels: months.map((month) => transformDate(month).monthName),
    datasets: [
      {
        label: "Active customers",
        data: [65, 59, 65, 50],
        fill: true,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "New customers",
        data: [55, 48, 40, 50],
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  const engagementCustomers = {
    labels: ["Masuso", "Masagana", "Bagong baryo"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="dashboard-engagement-to-customers">
      <div className="dashboard-engagement-to-customers--places-that-more-engagements">
        <div className="dashboard-engagement-to-customers--places-that-more-engagements__header">
          <p>Places</p>
          <p>shows where your business was the most engaged this month.</p>
        </div>
        <div className="dashboard-engagement-to-customers--places-that-more-engagements__chart">
          <Doughnut data={engagementCustomers} />
        </div>
      </div>
      <div className="dashboard-engagement-to-customers--bar">
        <div className="dashboard-engagement-to-customers--bar__header">
          <p>Customers</p>
          <p>shows how much your business engages with customers.</p>
        </div>
        <div className="dashboard-engagement-to-customers--bar__chart">
          <Bar data={placesRadarData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardEngagementCustomers;
