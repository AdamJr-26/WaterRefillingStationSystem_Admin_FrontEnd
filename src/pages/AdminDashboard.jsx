import React from "react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { Icon } from "@iconify/react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import {
  income,
  mostRefilledGallon,
  orderAndSchedule,
  placesData,
} from "../lib/sample/data";
import AdminDashboardCard2 from "../components/AdminDashboardCard2";
function AdminDashboard() {
  const cardData = [
    {
      title: "Total Delivery",
      amount: 12,
      iconComponent: <Icon icon="carbon:delivery-truck" />,
    },
    {
      title: "Total Delivery",
      amount: 12,
      iconComponent: <Icon icon="carbon:delivery-truck" />,
    },
    {
      title: "Total Delivery",
      amount: 12,
      iconComponent: <Icon icon="carbon:delivery-truck" />,
    },
    {
      title: "Total Delivery",
      amount: 12,
      iconComponent: <Icon icon="carbon:delivery-truck" />,
    },
    {
      title: "Total Delivery",
      amount: 12,
      iconComponent: <Icon icon="carbon:delivery-truck" />,
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard--greeting">
        <p className="admin-dashboard--greeting__greeting">
          Good morning, Boss!
        </p>
        <p className="admin-dashboard--greeting__date">October 3,2022</p>
      </div>
      <div className="admin-dashboard--charts">
        <div className="admin-dashboard--charts__graph-by-month">
          <div className="graph-card-wrapper">
            <div className="graph-card-wrapper--graph">
              <div className="graph-card-wrapper--graph__label">
                <p className="title">Viewing Charts</p>
                <p className="description">
                  This is chart presentation from your date selected, and you
                  can select type to view below.
                </p>
              </div>
              <Bar data={income} />
            </div>

            <div className="graph-card-wrapper--cards">
              <div className="card">
                <AdminDashboardCard2
                  title="Deliveries"
                  amount="33"
                  iconName="akar-icons:truck"
                  active={false}
                />
              </div>
              <div className="card">
                <AdminDashboardCard2
                  title="Deliveries"
                  amount="33"
                  iconName="akar-icons:truck"
                  active={true}
                />
              </div>
              <div className="card">
                <AdminDashboardCard2
                  title="Deliveries"
                  amount="33"
                  iconName="akar-icons:truck"
                  active={true}
                />
              </div>
              <div className="card">
                <AdminDashboardCard2
                  title="Deliveries"
                  amount="33"
                  iconName="akar-icons:truck"
                  active={false}
                />
              </div>
            </div>
            <div className="select-month">
              <p>Select Month</p>
              <div className="select-month--options">
                <div className="select-month--options__item">
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "september",
                    "October",
                  ].map((month, i) => (
                    <div key={i} className="select-month--month">
                      <p>{month}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="compare-charts-group">
              <div className="graph-pies">
                <div className="graph-pies--order-scheduled">
                  <Pie
                    data={orderAndSchedule}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                    }}
                  />
                </div>
                <div className="graph-pies--most-refilled">
                  <Pie
                    data={mostRefilledGallon}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                    }}
                  />
                </div>
              </div>
              {/* income, expenses */}
              <div className="line-charts-profit-expenses">
                <div className="line-charts-profit-expenses--chart">
                  <Line data={placesData} />
                  <div className="line-charts-profit-expenses--chart__selector">
                    {["Expenses", "Income"].map((item) => (
                      <div className="item" key={item}>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* #------------------------------------  */}
        </div>
        {/* ##================================== */}

        <div className="admin-dashboard--charts__graph-places">
          {/* gaph by places */}
          <div className="label">
            <p className="title">Select Places to analize</p>
            <p className="description">
              This is chart presentation from your date selected, and you can
              select type to view below.
            </p>
          </div>
          <div className="line-chart">
            <Line data={placesData} />
          </div>
          <div>
            <p>Select Places</p>
            <div>
              <div>
                <p>Bunsuran 1</p>
              </div>
            </div>
          </div>
        </div>
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
