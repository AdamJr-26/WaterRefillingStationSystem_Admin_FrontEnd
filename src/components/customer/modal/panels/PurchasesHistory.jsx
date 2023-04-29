import React, { useState, useEffect } from "react";
import transformDate from "../../../../utils/date.toString";
import { Icon } from "@iconify/react";
import useFetch from "../../../../hooks/api/useFetch";
import TablePaginationButtons from "../../../general/TablePaginationButtons";

function PurchasesHistory({ customer_id }) {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {
    data,
    error,
    mutate: mutatePagination,
    isValidating,
    isLoading,
  } = useFetch({
    url: `/api/purchase/history/${limit}/${page}/${fromDate}/${toDate}/${customer_id}`,
  });

  const onChangeFrom = (value) => {
    setFromDate(value);
  };
  const onChangeTo = (value) => {
    const from_date_unix = Math.floor(new Date(fromDate).valueOf() / 1000);
    if (Math.floor(new Date(value).valueOf() / 1000) > from_date_unix) {
      setToDate(value);
    } else {
      console.log("Select date from 1 day apart.");
    }
  };
  const clearDate = () => {
    setFromDate(null);
    setToDate(null);
  };

  // Number of buttons to show in the pagination
  const buttonsToShow = 5;
  // Calculate the range of buttons to display
  const startRange = Math.max(1, page - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(
    data?.data?.totalPages,
    startRange + buttonsToShow - 1
  );

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    pages.push(i);
  }

  console.log("[data-purchases]", data);
  return (
    <div className="return-gallon-history-wrapper">
      <div className="return-gallon-history-header">
        <div>
          <p>Purchases histories</p>
          {fromDate && toDate ? (
            <div className="transactions-wrapper--date-from-results">
              <p>
                You are seeing the result of your selected range of dates.
                <button onClick={() => clearDate()}>Clear</button>
              </p>
            </div>
          ) : null}
        </div>
        <div className="return-gallon-history-header--query-dates">
          <div>
            <p>From: </p>
            <input
              type="date"
              value={fromDate ? fromDate : ""}
              onChange={(e) => onChangeFrom(e.target.value)}
            />
          </div>
          <div>
            <p>To: </p>
            <input
              type="date"
              value={toDate ? toDate : ""}
              onChange={(e) => onChangeTo(e.target.value)}
            />
          </div>
        </div>
      </div>
      {data?.data?.docs?.map((purchase, i) => (
        <div key={i} className="purchases-history">
          <div className="purchases-history--info">
            <p className="purchases-history--info__date">
              {transformDate(purchase.date.utc_date).string_date}
            </p>
            <button>Details</button>
          </div>
          <div className="purchases-history--amounts">
            <div className="purchases-history--amounts__item">
              <p>Orders</p>
              <p>{purchase?.total_orders}</p>
            </div>
            <div className="purchases-history--amounts__item">
              <p>Payment</p>
              <p>{purchase.order_to_pay}</p>
            </div>
          </div>
        </div>
      ))}

      {/* the  */}
      <div className="transactions-wrapper--pagination-buttons">
        <TablePaginationButtons
          pages={pages}
          setPage={setPage}
          currentPage={page}
          totalPages={data?.data?.totalPages}
        />
      </div>
    </div>
  );
}

export default PurchasesHistory;
