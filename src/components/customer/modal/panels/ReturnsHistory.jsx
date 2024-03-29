import React, { useState, useEffect } from "react";
import transformDate from "../../../../utils/date.toString";
import { Icon } from "@iconify/react";
import useFetch from "../../../../hooks/api/useFetch";
import ListSkeletonLoading from "../../../general/ListSkeletonLoading";
import TablePaginationButtons from "../../../general/TablePaginationButtons";

function ReturnsHistory({ customer_id }) {
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
    url: `/api/return/history/${limit}/${page}/${fromDate}/${toDate}/${customer_id}`,
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

  console.log("data.pages------------------", data);

  return (
    <div className="return-gallon-history-wrapper">
      <div className="return-gallon-history-header">
        <div>
          <p>Return histories</p>
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
      {!isLoading ? (
        data?.data?.docs?.map((return_history, i) => (
          <div key={i} className="return-gallon-history">
            <div className="return-gallon-history--info">
              <div className="return-gallon-history--info__image-wrapper">
                <img src={return_history?.gallon[0]?.gallon_image} alt="" />
              </div>
              <div className="return-gallon-history--info__gallon-info">
                <p className="gallon-info-name">
                  {return_history?.gallon[0]?.name}
                </p>
                <p className="gallon-info-liter">
                  {return_history?.gallon[0]?.liter} liter
                </p>
                <div className="return-gallon-history-info-gallon-info-date-personnel">
                  <div className="return-gallon-history-info-gallon-info-date-personnel--date">
                    <p>
                      {transformDate(return_history?.date.utc_date).string_date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="return-gallon-history--amounts">
              <div className="return-gallon-history--amounts__item">
                <p>Returned</p>
                <p>{return_history?.total_returned}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <ListSkeletonLoading num_lines={limit} />
      )}

      {/* the  */}
      <div className="transactions-wrapper--pagination-buttons">
        {data?.data?.docs.length && !isLoading ? (
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

export default ReturnsHistory;
