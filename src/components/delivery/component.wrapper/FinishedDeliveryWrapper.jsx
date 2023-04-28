import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
import AdminDeliveryDataTable from "../AdminDeliveryDataTable";
function FinishedDeliveryWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  const [limitItems, setLimitItems] = useState(5);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {
    data: finishedDeliveries,
    error: finishedDeliveriesError,
    mutate: mutateFinishedDeliveries,
    isValidating: isValidatingFD,
  } = useFetch({
    url: `/api/deliveries/finished/${fromDate}/${toDate}/${limitItems}/${
      limitItems * currentPage - limitItems
    }`,
  });

  console.log("finishedDeliveries", finishedDeliveries);

  const onPressPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onPressnext = () => {
    if (finishedDeliveries?.data.length >= limitItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onChangeTo = (value) => {
    const from_date_unix = Math.floor(new Date(fromDate).valueOf() / 1000);
    if (Math.floor(new Date(value).valueOf() / 1000) > from_date_unix) {
      setToDate(value);
    } else {
      console.log("Select date from 1 day apart.");
    }
  };
  const onChangeFrom = (value) => {
    setFromDate(value);
  };
  return (
    <div className="delivery-data-table">
      <div className="delivery-data-table--header">
        <div>
          <p className="delivery-data-table--header__title">
            Finished Deliveries
          </p>
          <p className="delivery-data-table--header__description">
            Tracks the finished deliveries
          </p>
        </div>
        <div className="delivery-data-table--header__menu">
          <div className="delivery-data-table-header-menu-date-query">
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
      </div>
      {fromDate && toDate ? (
        <div className="transactions-wrapper--date-from-results">
          <p>
            You are seeing the result of your selected range of dates.
            <button onClick={() => clearDate()}>Clear</button>
          </p>
        </div>
      ) : (
        <div>
          <p>Today's Deliveries</p>
        </div>
      )}
      <AdminDeliveryDataTable
        data={finishedDeliveries}
        error={finishedDeliveriesError}
        isValidating={isValidatingFD}
      />
      {finishedDeliveries?.data.length >= limitItems ? (
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
          {finishedDeliveries?.data.length ? (
            <p className="transactions-wrapper--pagination-buttons__current-page">
              {currentPage}
            </p>
          ) : null}

          {finishedDeliveries?.data.length >= limitItems ? (
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
      ) : null}
    </div>
  );
}

export default FinishedDeliveryWrapper;
