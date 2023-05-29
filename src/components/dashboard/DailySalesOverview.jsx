import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import useFetch from "../../hooks/api/useFetch";
import { format, sub } from "date-fns";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { apiGet } from "../../services/api/axios.methods";

function DailySalesOverview() {
  const date = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(sub(new Date(), { days: 1 }), "yyyy-MM-dd");
  const formattedDateToday = format(new Date(), "MMM-dd-yyyy");
  const formattedDateYesterday = format(
    sub(new Date(), { days: 1 }),
    "MMM-dd-yyyy"
  );

  const [dailyReport, setDailyReport] = useState(null);
  useEffect(() => {
    async function fetch() {
      const { data, error } = await apiGet(
        `/api/dashboard/todays-progress/${date}`
      );
      if (data && !error) {
        setDailyReport(data?.data[0]);
      }
    }

    fetch();
  }, []);
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview--stat">
        <StatGroup>
          <Stat>
            <StatLabel>Cash Received</StatLabel>
            <StatNumber>₱ {dailyReport?.cashReceiveToday}</StatNumber>
            <StatHelpText>{formattedDateToday}</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Sales</StatLabel>

            <StatNumber>₱ {dailyReport?.totalSalesToday}</StatNumber>
            <StatHelpText>
              {dailyReport?.salesPercentage == "N/A" ? (
                dailyReport?.salesPercentage
              ) : (
                <>
                  <StatArrow
                    type={
                      dailyReport?.salesToday < dailyReport?.salesYesterday ? "decrease" : "increase"
                    }
                  />
                  {dailyReport?.salesPercentage}%
                </>
              )}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Expenses</StatLabel>

            <StatNumber>₱ {dailyReport?.expenseToday}</StatNumber>
            <StatHelpText>
              {dailyReport?.expensesPercentage == "N/A" ? (
                dailyReport?.expensesPercentage
              ) : (
                <>
                  <StatArrow
                    type={
                      dailyReport?.expensesPercentage <= 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {dailyReport?.expensesPercentage}%
                </>
              )}
            </StatHelpText>
          </Stat>
        </StatGroup>
      </div>
    </div>
  );
}

export default DailySalesOverview;
