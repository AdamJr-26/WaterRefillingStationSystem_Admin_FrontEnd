import React, { useState } from "react";
import AdminCustomerDataTable from "../AdminCustomerDataTable";
import useFetch from "../../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
import AdminSearchBox from "../../../components/AdminSearchbox";

function CustomerStatusTableWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitItems, setLimitItems] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortby, setSortby] = useState("firstname");
  const [existsOnly, setExistsOnly] = useState("firstname");
  const onPressPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onPressnext = () => {
    if (customersStatus?.data?.data?.length >= limitItems) {
      setCurrentPage(currentPage + 1);
    }
  };
  const customersStatus = useFetch({
    url: `/api/customers/status/borrowed/credits/lastdelivery/${limitItems}/${
      limitItems * currentPage - limitItems
    }/${searchText ? searchText : null}/${sortby}/${existsOnly}`,
  });
  console.log("customersStatus", customersStatus);

  const handleSortOption = (e) => {
    setSortby(e.target.value);
  };
  const handleSelectOnly = (e) => {
    setExistsOnly(e.target.value);
  };
  return (
    <div className="table-customers">
      <div className="table-customers--header">
        <div className="table-customers--header__title-description">
          <p className="title">customers</p>
          <p className="description">Manage your customers</p>
        </div>
        <div className="table-customers--header__menu">
          <div className="query-by">
            <div className="query-by--options">
              <AdminSearchBox
                placeholder="Search"
                value={searchText}
                setValue={setSearchText}
              />
            </div>
            <div className="query-by--options">
              <p>Sort by: </p>
              <select
                onChange={(e) => handleSortOption(e)}
                name="sort"
                id="sort"
              >
                <option value="firstname">Sort by firstname</option>
                <option value="lastname">Sort by lastname</option>
                <option value="last_delivery.date.unix_timestamp">
                  Last Delivery
                </option>
                {/* <option value="schedules.schedule.unix_timestamp">
                  Schedule
                </option> */}
              </select>
            </div>
            <div className="query-by--options">
              <p>Select only: </p>
              <select
                onChange={(e) => handleSelectOnly(e)}
                name="sort"
                id="sort"
              >
                <option value="firstname" disabled selected>
                  Options
                </option>
                <option value="last_delivery.date.unix_timestamp">
                  With Last Delivery
                </option>
                <option value="schedules.schedule.unix_timestamp">
                  With schedule
                </option>
                <option value="credit.total_credit_amount">With credit</option>
                <option value="borrow.total_borrowed_gallon">
                  With Borrowed
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <AdminCustomerDataTable
        data={customersStatus?.data}
        error={customersStatus.error}
        isValidating={customersStatus.isValidating}
        setSortby={setSortby}
      />

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
            <p>PREVIOUS</p>
          </div>
        ) : null}
        {customersStatus.data?.data?.length ? (
          <p className="transactions-wrapper--pagination-buttons__current-page">
            {currentPage}
          </p>
        ) : null}

        {customersStatus.data?.data?.length >= limitItems ? (
          <div
            onClick={() => onPressnext()}
            className="transactions-wrapper--pagination-buttons__next"
          >
            <p>NEXT</p>
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

export default CustomerStatusTableWrapper;
