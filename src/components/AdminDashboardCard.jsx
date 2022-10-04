import React from "react";

function AdminDashboardCard({ title, amount, iconComponent }) {

  return (
    <div className="admin-dashboard-card">
      <div className="admin-dashboard-card--details">
        <span className="admin-dashboard-card--details__title">{title}</span>
        <span className="admin-dashboard-card--details__amount">{amount}</span>
      </div>

      <div className="admin-dashboard-card--icon-wrapper">{iconComponent}</div>
    </div>
  );
}

export default AdminDashboardCard;
