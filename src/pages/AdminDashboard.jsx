import React from "react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { Icon } from "@iconify/react";
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
      <div>
        <p>Today's Current Report</p>
        <p> | September 26th, 2022</p>
      </div>
      <div className="admin-dashboard--cards">
        {cardData.map((item, i) => (
          <AdminDashboardCard
            key={i}
            title={item.title}
            amount={item.amount}
            iconComponent={item.iconComponent}
          />
        ))}
      </div>
      <div>
        some other components here
      </div>
    </div>
  );
}

export default AdminDashboard;
