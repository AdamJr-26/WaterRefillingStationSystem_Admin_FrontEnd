import React from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { Bar, Line, Pie, Polar, Radar } from "react-chartjs-2";
import transformDate from "../../utils/date.toString";
import { Icon } from "@iconify/react";
import { Tooltip, Text } from "@chakra-ui/react";

function SalesOverivew({ selectedDate, data }) {
  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: startMonth, end: endMonth });
  const salesData = Array(days.length).fill(0);
  // SALES
  data?.data[0]?.purchases?.map((purchase) => {
    var index = purchase._id - 1;
    salesData[index] = purchase.total_orders_paid_unpaid_amount;
  });
  // EXPENSES
  const expenseData = Array(days.length).fill(0);
  data?.data[0]?.expenses?.map((expense) => {
    var index = expense._id - 1;
    expenseData[index] = expense.amount;
  });
  // PAID PRODUCTS
  const paidProductsData = Array(days.length).fill(0);
  data?.data[0]?.purchases?.map((purchase) => {
    var index = purchase._id - 1;
    paidProductsData[index] += purchase.paid_orders_amount;
  });
  data?.data[0]?.paid_credits?.map((paid_credit) => {
    var index = paid_credit._id - 1;
    paidProductsData[index] += paid_credit.amount_paid;
  });
  // data?.data[0]?.expenses?.map((expense) => {
  //   var index = expense._id - 1;
  //   paidProductsData[index] -= expense.amount;
  // });
  const paymentReceivedDatasets = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "Payment received",
        data: paidProductsData,
        backgroundColor: "#27aeef",
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const salesDatasets = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "Sales",
        data: salesData,
        backgroundColor: "#00c698",
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="admin-reports-payment-received-sales">
      <div className="admin-reports-payment-received-sales--payment-received">
        <div className="admin-reports-payment-received-sales--payment-received__card">
          <div className="payment-received-content">
            <p className="payment-received-content--title">Payment received</p>
            <div className="payment-received-content--amount">
              <p>₱ {data?.data[0].paidProducts}</p>
              <div className="payment-received-content--amount__other-contents">
                <Tooltip
                  hasArrow
                  label="From paid purchases"
                  bg="gray.100"
                  color="black"
                >
                  <div>
                    <p>
                      <Icon icon="bx:purchase-tag" />
                    </p>
                    <p>₱ {data?.data[0]?.total_paid_product_amount}</p>
                  </div>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="From debt payment"
                  bg="gray.100"
                  color="black"
                >
                  <div>
                    <p>
                      <Icon icon="carbon:purchase" />
                    </p>
                    <p>₱ {data?.data[0]?.debt_payment_received}</p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>
        <div className="admin-reports-payment-received-sales--payment-received__bar">
          <Bar data={paymentReceivedDatasets} />
        </div>
      </div>

      <div className="admin-reports-payment-received-sales--sales">
        <div className="admin-reports-payment-received-sales--sales__card ">
          <div className="sales">
            <p className="sales--title">Product sales</p>
            <div className="sales--amount">
              {/* paid invoices and debt payment */}
              <p>₱ {data?.data[0].total_sales}</p>
              <div className="sales--amount__other-contents">
                <Tooltip hasArrow label="Paid gallons" bg="gray.100" color="black">
                  <div>
                    <p>
                      <Icon icon="game-icons:water-gallon" />
                    </p>
                    <p> {data?.data[0]?.total_paid_product}</p>
                  </div>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="Credited gallons"
                  bg="gray.100"
                  color="black"
                >
                  <div>
                    <p>
                      <Icon icon="game-icons:water-gallon" />
                    </p>
                    <p>{data?.data[0]?.total_credited_gallons_count}</p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>

        <div className="admin-reports-payment-received-sales--sales__card ">
          <div className="sales">
            <p className="sales--title">Current outstanding products</p>
            <div className="sales--amount">
              {/* paid invoices and debt payment */}
              <p>₱ {data?.data[0].total_credits_amount}</p>
              <div className="sales--amount__other-contents">
                <Tooltip
                  hasArrow
                  label="customers have credit."
                  bg="gray.100"
                  color="black"
                >
                  <div>
                    <p>
                      <Icon icon="ic:baseline-people-outline" />
                    </p>
                    <p>{data?.data[0]?.total_customers_with_credit}</p>
                  </div>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="Total gallons"
                  bg="gray.100"
                  color="black"
                >
                  <div>
                    <p>
                      <Icon icon="game-icons:water-gallon" />
                    </p>
                    <p>{data?.data[0]?.total_credits_gallon_count}</p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-reports-payment-received-sales--sales__bar">
          <Bar data={salesDatasets} />
        </div>
      </div>
    </div>
  );
}

export default SalesOverivew;
