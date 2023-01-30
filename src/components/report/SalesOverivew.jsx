import React from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { Bar, Line, Pie } from "react-chartjs-2";
import transformDate from "../../utils/date.toString";

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
  // PROFITS
  const profitData = Array(days.length).fill(0);
  data?.data[0]?.purchases?.map((purchase) => {
    var index = purchase._id - 1;
    profitData[index] += purchase.paid_orders_amount;
  });
  data?.data[0]?.paid_credits?.map((paid_credit) => {
    var index = paid_credit._id - 1;
    profitData[index] += paid_credit.amount_paid;
  });
  data?.data[0]?.expenses?.map((expense) => {
    var index = expense._id - 1;
    profitData[index] -= expense.amount;
  });
  const profit = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "Profit",
        data: profitData,
        backgroundColor: "#27aeef",
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const sales_and_expenses = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "sales",
        data: salesData,
        backgroundColor: "#7eb0d5",
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        id: 1,
        label: "Expenses",
        data: expenseData,
        backgroundColor: "#fd7f6f",
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div className="admin-reports-profit-sales-expenses">
      <div className="admin-reports-profit-sales-expenses--profit">
        <div className="admin-reports-profit-sales-expenses--profit__card profit">
          <p className="title">Profit</p>
          <div className="content">
            <p>₱ {data?.data[0].profit}</p>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>
        <div className="admin-reports-profit-sales-expenses--profit__card">
          <p className="title">Debt payment</p>
          <div>
            <p>₱ {data?.data[0].debt_payment_received}</p>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>

        <div className="admin-reports-profit-sales-expenses--profit__bar">
          <Bar data={profit} />
        </div>
      </div>
      <div className="admin-reports-profit-sales-expenses--sales-expenses">
        <div className="admin-reports-profit-sales-expenses--sales-expenses__card">
          <p className="title">Sales</p>
          <div>
            <p>₱ {data?.data[0].total_sales}</p>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>
        <div className="admin-reports-profit-sales-expenses--sales-expenses__card">
          <p className="title">Expenses</p>
          <div>
            <p>₱ {data?.data[0].total_expenses}</p>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>
        <div className="admin-reports-profit-sales-expenses--sales-expenses__bar">
          <Bar data={sales_and_expenses} />
        </div>
      </div>
    </div>
  );
}

export default SalesOverivew;
