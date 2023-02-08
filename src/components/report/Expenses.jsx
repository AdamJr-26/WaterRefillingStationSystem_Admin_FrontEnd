import React from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { Bar, Line, Pie, Polar, Radar } from "react-chartjs-2";
import transformDate from "../../utils/date.toString";
import { Icon } from "@iconify/react";
import { Tooltip, Text } from "@chakra-ui/react";

function Expenses({ selectedDate, data }) {
  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: startMonth, end: endMonth });

  const expensesData = Array(days.length).fill(0);
  //   EXPENSES
  data?.data[0]?.expenses?.map((expense) => {
    var index = expense._id - 1;
    expensesData[index] = expense.amount;
  });

  const expensesDatasets = {
    labels: days?.map((date) => transformDate(date).day),
    datasets: [
      {
        id: 1,
        label: "Expenses",
        data: expensesData,
        backgroundColor: "#ecbe5e",
        lineTension: 0.1,
        borderColor: "ecbe5e",
      },
    ],
  };
  return (
    <div className="expenses-overview">
      <div className="expenses-overview--chart">
        <div className="expenses-overview--chart__card">
          <div className="expenses-card-overview">
            <p className="expenses-card-overview--title">Expenses</p>
            <div className="expenses-card-overview--amount">
              <p>₱ {data?.data[0]?.total_expenses}</p>
            </div>
          </div>
          <p className="month">{transformDate(startMonth).monthName}</p>
        </div>
        <div className="expenses-overview--chart__bar">
          <Bar data={expensesDatasets} />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
