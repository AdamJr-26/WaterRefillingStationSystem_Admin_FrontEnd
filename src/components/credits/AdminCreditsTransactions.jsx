import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
import transformDate from "../../utils/date.toString";

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import PayCreditsModal from "../general/modal/PayCreditsModal";

import NoData from "../general/NoData";
import ListSkeletonLoading from "../general/ListSkeletonLoading";
import TablePaginationButtons from "../general/TablePaginationButtons";

function AdminCreditsLastransactions() {
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
    url: `/api/credits/pagination/${limit}/${page}/${fromDate}/${toDate}`,
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
    } else {
    }
  }, [fromDate, toDate]);

  // modal
  const [selectedCredit, setSelectedCredit] = useState(null);
  const paycreditsClosure = useDisclosure();

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

  return (
    <div className="transactions-wrapper">
      {/* modal */}
      <PayCreditsModal
        isOpen={paycreditsClosure.isOpen}
        onOpen={paycreditsClosure.onOpen}
        onClose={paycreditsClosure.onClose}
        credit={selectedCredit}
        mutatePagination={mutatePagination}
      />

      <div className="transactions-wrapper--header">
        <div>
          <p className="transactions-wrapper--header__title">Credits</p>
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
      {!isLoading ? (
        !data?.data?.docs?.length ? (
          <NoData min_height={500} />
        ) : (
          data?.data?.docs?.map((credit, index) => (
            <div
              onClick={() => {
                setSelectedCredit(credit);
                paycreditsClosure.onOpen();
              }}
              className="transactions-wrapper--item"
              key={index}
            >
              <div className="transactions-wrapper--item__image-wrapper">
                <img
                  src={credit?.customer_info[0]?.display_photo}
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="transactions-wrapper--item__person-info">
                <span className="name">
                  {credit?.customer_info[0]?.firstname || ""}{" "}
                  {credit?.customer_info[0]?.lastname || ""}
                </span>
                {/* <span className="address">
                  {credit?.customer_info[0]?.address?.street}{" "}
                  {credit?.customer_info[0]?.address?.barangay}{" "}
                  {credit?.customer_info[0]?.address?.municipal_city}{" "}
                  {credit?.customer_info[0]?.address?.province}
                </span> */}
                <div className="regular-date-wrapper">
                  <span className="role">
                    {credit?.customer_info[0]?.customer_type}
                  </span>
                  <span className="date">
                    Updated: {transformDate(credit.date.utc_date).string_date}
                  </span>
                </div>
              </div>
              <div className="transactions-wrapper--item__amount-buttons">
                <div>
                  <p>Gallon</p>
                  <p style={{fontSize: "16px"}}>{credit?.gallonInfo[0]?.name}</p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p>{credit?.total}</p>
                </div>
                <div>
                  <p>Total price</p>
                  <p>₱ {credit?.total * credit?.price}</p>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <ListSkeletonLoading num_lines={5} />
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

export default AdminCreditsLastransactions;
