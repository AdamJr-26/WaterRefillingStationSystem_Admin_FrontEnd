import React, { useState } from "react";
import AdminCustomerDataTable from "../AdminCustomerDataTable";
import useFetch from "../../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
function CustomerStatusTableWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitItems, setLimitItems] = useState(5);

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
    }`,
  });
  console.log("customersStatus", customersStatus?.data);

  return (
    <div className="table-customers">
      <div className="table-customers--header">
        <div className="table-customers--header__title-description">
          <p className="title">customers</p>
          <p className="description">Manage your customers</p>
        </div>
        <div className="table-customers--header__menu">
          <div className="query-by">
            <p className="query-by--title">Query by</p>
            <div className="query-by--options">
              <button className="query-by--options__button">All</button>
            </div>
          </div>
        </div>
      </div>
      <AdminCustomerDataTable data={customersStatus?.data} />

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
