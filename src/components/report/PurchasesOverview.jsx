import React from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

import { Bar, Line, Pie, Polar } from "react-chartjs-2";

import transformDate from "../../utils/date.toString";
import { Icon } from "@iconify/react";
import useFetch from "../../hooks/api/useFetch";

function PurchasesOverview({ selectedDate, data }) {
  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: startMonth, end: endMonth });

  // const { data, error } = useFetch({
  //   url: `/api/reports/purchases/${transformDate(selectedDate).y_m_d}`,
  // });
  // console.log("[PURCHASES-REPORTS]", data);

  const purchasesData = Array(days.length).fill(0);
  const paid_orders_data = Array(days.length).fill(0);
  data?.data[0]?.purchases?.map((purchase) => {
    var index = purchase._id - 1;
    purchasesData[index] = purchase.purchases;
    paid_orders_data[index] = purchase.paid_orders;
  });

  const purchasesStatus = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "Total Purchased products",
        data: purchasesData, //data?.data[0].purchases?.map((purchase) => purchase.purchases),
        fill: false,
        borderColor: "#1a53ff",
        pointBackgroundColor: "#1a53ff",
        pointBorderWidth: 1,
      },
      {
        id: 2,
        label: "Total Paid Products",
        data: paid_orders_data,
        fill: false,
        borderColor: "#5ad45a",
        pointBackgroundColor: "#5ad45a",
        pointBorderWidth: 1,
      },
    ],
  };

  return (
    <div className="purchase-overview">
      <div className="purchase-overview--header">
        <p className="purchase-overview--header__title">
          Monthly Purchase Transactions 
        </p>
        <p className="purchase-overview--header__description">
          displays the total number of purchases made in a given month. 
        </p>
      </div>
      <div className="purchase-overview--main-bar">
        <Line data={purchasesStatus} />
      </div>
      <div className="purchase-overview--summary">
        <div className="purchase-overview--summary__item">
          <p className="icon">
            <Icon icon="fluent-mdl2:product" />
          </p>
          <div className="">
            <p>Total sold gallons</p>
            <p>{data?.data[0]?.total_purchased_product}</p>
          </div>
        </div>
        <div className="purchase-overview--summary__item">
          <p className="icon">
            <Icon icon="fluent-mdl2:product" />
          </p>
          <div className="">
            <p>Paid gallons</p>
            <p>{data?.data[0]?.total_paid_product}</p>
          </div>
        </div>
        {/* <div className="purchase-overview--summary__item">
          <p className="icon">
            <Icon icon="material-symbols:arrow-circle-up-outline" />
          </p>
          <div className="">
            <p>Paid purchase</p>
            <p>₱ {data?.data[0]?.total_paid_product_amount}</p>
          </div>
        </div>
        <div className="purchase-overview--summary__item">
          <p className="icon">
            <Icon icon="material-symbols:arrow-circle-down-outline" />
          </p>
          <div className="">
            <p>Credited gallons</p>
            <p>₱ {data?.data[0]?.total_unpaid_amount}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PurchasesOverview;

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//   } from "chart.js";
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
//   );
