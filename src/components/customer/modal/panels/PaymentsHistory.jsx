import React, { useState, useEffect } from "react";
import transformDate from "../../../../utils/date.toString";
import { Icon } from "@iconify/react";
import useFetch from "../../../../hooks/api/useFetch";
import ListSkeletonLoading from "../../../general/ListSkeletonLoading";

function PaymentsHistory({ customer_id }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitItems, setLimitItems] = useState(5);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {
    data,
    error,
    mutate: mutatePagination,
    isValidating,
  } = useFetch({
    url: `/api/customer-credit/history/${limitItems}/${
      limitItems * currentPage - limitItems
    }/${fromDate}/${toDate}/${customer_id}`,
  });

  console.log("[data-payments-receipts]", data);

  const onPressnext = () => {
    if (data?.data.length >= limitItems) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onPressPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
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
  return (
    <div className="return-gallon-history-wrapper">
      <div className="return-gallon-history-header">
        <div>
          <p>Payment histories</p>
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
      { 
    !isValidating ?
      data?.data?.map((payment, i) => (
        <div key={i} className="return-gallon-history">
          <div className="return-gallon-history--info">
            <div className="return-gallon-history--info__image-wrapper">
              <img src={payment?.gallon[0]?.gallon_image} alt="" />
            </div>
            <div className="return-gallon-history--info__gallon-info">
              <p className="gallon-info-name">{payment?.gallon[0]?.name}</p>
              <p className="gallon-info-liter">
                {payment?.gallon[0]?.liter} Liters
              </p>
              <div className="return-gallon-history-info-gallon-info-date-personnel">
                <div className="return-gallon-history-info-gallon-info-date-personnel--date">
                  <p>{transformDate(payment?.date.utc_date).string_date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="return-gallon-history--amounts" >
            <div className="return-gallon-history--amounts__item">
              <p>Count</p>
              <p>{payment.gallon_count}</p>
            </div>
            <div className="return-gallon-history--amounts__item">
              <p>Amount paid</p>
              <p>{payment.amount_paid}</p>
            </div>
          </div>
        </div>
      ))
        : <ListSkeletonLoading num_lines={limitItems} />
    }

      {/* the  */}
      <div className="transactions-wrapper--pagination-buttons">
        {currentPage > 1 ? (
          <div
            onClick={() => onPressPrev()}
            className="transactions-wrapper--pagination-buttons__back"
          >
            <p>
              <Icon icon="ic:sharp-navigate-before" />
            </p>
            <p>
              <Icon icon="ic:sharp-navigate-before" />
            </p>
            <p>Prev</p>
          </div>
        ) : null}
        {data?.data.length ? (
          <p className="transactions-wrapper--pagination-buttons__current-page">
            {currentPage}
          </p>
        ) : null}

        {data?.data.length >= limitItems ? (
          <div
            onClick={() => onPressnext()}
            className="transactions-wrapper--pagination-buttons__next"
          >
            <p>Next</p>
            <p>
              <Icon icon="ic:sharp-navigate-next" />
            </p>
            <p>
              <Icon icon="ic:sharp-navigate-next" />
            </p>{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PaymentsHistory;
