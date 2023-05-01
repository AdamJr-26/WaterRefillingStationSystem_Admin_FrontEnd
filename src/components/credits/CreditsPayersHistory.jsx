import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/api/useFetch";
import transformDate from "../../utils/date.toString";
import ListSkeletonLoading from "../general/ListSkeletonLoading";
import TablePaginationButtons from "../general/TablePaginationButtons";

function CreditsPayersHistory() {
  // set initial value of current page, total_pages, and limit per page.
  // if current page value is greater then limit then add anohter page to fetch else do not create.
  //
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
    url: `/api/credits/history/pagination/${limit}/${page}/${fromDate}/${toDate}`,
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
  useEffect(() => {
    const from_date_unix = Math.floor(new Date(fromDate).valueOf() / 1000);
    const to_date_unix = Math.floor(new Date(toDate).valueOf() / 1000);
    console.log("to_date_unix", to_date_unix);
    if (to_date_unix > from_date_unix) {
      setPage(1);
      mutatePagination();
      console.log("mutating.......");
    } else {
    }
  }, [fromDate, toDate]);

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
  console.log("data-------:>>>>>>>>>", data);
  return (
    <div className="transactions-wrapper">
      <div className="transactions-wrapper--header">
        <div>
          <p className="transactions-wrapper--header__title">History</p>
        </div>
        <div className="transactions-wrapper--header__query-dates">
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
      {fromDate && toDate ? (
        <div className="transactions-wrapper--date-from-results">
          <p>
            You are seeing the result of your selected range of dates.
            <button onClick={() => clearDate()}>Clear</button>
          </p>
        </div>
      ) : null}
      {isLoading ? (
        <ListSkeletonLoading num_lines={limit} />
      ) : (
        data?.data?.docs?.map((credit, index) => (
          <div className="transactions-wrapper--item" key={index}>
            <div className="transactions-wrapper--item__image-wrapper">
              <img src={credit?.customer[0]?.display_photo} alt="" srcSet="" />
            </div>
            <div className="transactions-wrapper--item__person-info">
              <span className="name">
                {credit?.customer[0]?.firstname || ""}{" "}
                {credit?.customer[0]?.lastname || ""}
              </span>
              <span className="address">
                {credit?.customer[0]?.address?.street}{" "}
                {credit?.customer[0]?.address?.barangay}{" "}
                {credit?.customer[0]?.address?.municipal_city}{" "}
                {credit?.customer[0]?.address?.province}
              </span>
              <div className="regular-date-wrapper">
                <span className="role">
                  {credit?.customer[0]?.customer_type}
                </span>
                <span className="date">
                  Date: {transformDate(credit.date.utc_date).string_date}
                </span>
              </div>
            </div>
            <div className="transactions-wrapper--item__amount-buttons">
              <div>
                <p>Count</p>
                <p>{credit?.gallon_count}</p>
              </div>
              <div>
                <p>Paid</p>
                <p>₱ {credit?.amount_paid}</p>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="transactions-wrapper--pagination-buttons">
        {data?.data?.docs?.length && !isLoading ? (
          <TablePaginationButtons
            pages={pages}
            setPage={setPage}
            currentPage={page}
            totalPages={data?.data?.totalPages}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreditsPayersHistory;
