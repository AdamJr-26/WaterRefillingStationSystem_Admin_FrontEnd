import React from "react";

function SalesAchievementCard({ data }) {
  return (
    <div className="admin-employee-sales-achievement-card">
      <div className="admin-employee-sales-achievement-card--personnel-info">
        <div className="admin-employee-sales-achievement-card--personnel-info__image-wrapper">
          <img src={data?.display_photo} alt="" />
        </div>
        <p className="admin-employee-sales-achievement-card--personnel-info__name">
          {data?.firstname} {data?.lastname}
        </p>
        <p className="admin-employee-sales-achievement-card--personnel-info__type">
          {data?.position}
        </p>
      </div>
      <div className="admin-employee-sales-achievement-card--statistic">
        <div className="admin-employee-sales-achievement-card--statistic__sales">
          <p>Sales</p>
          <p>₱ {data?.purchases[0]?.sales || 0} </p>
        </div>
        <div className="admin-employee-sales-achievement-card--statistic__border"></div>
        <div className="admin-employee-sales-achievement-card--statistic__engagement">
          <p>Deliveries </p>
          <div>
            <p>{data?.deliveries[0]?.total_deliveries || 0}</p>
            <p>25%</p>
          </div>
        </div>
      </div>
      <div className="admin-employee-sales-achievement-card--other-info">
        <button className="admin-employee-sales-achievement-card--other-info__profile">
          Profile
        </button>
      </div>
    </div>
  );
}

export default SalesAchievementCard;
