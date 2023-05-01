import React, { useState, useEffect } from "react";
import { Stack, Spinner } from "@chakra-ui/react";
import AdminCustomerDataTable from "../AdminCustomerDataTable";
import useFetch from "../../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
import AdminSearchBox from "../../AdminSearchbox";
import ListSkeletonLoading from "../../general/ListSkeletonLoading";
import CustomerTable from "../CustomerTable";
import { apiGet } from "../../../services/api/axios.methods";

function CustomerStatusTableWrapper() {
  let limit = 5;
  const [customerPage, setCustomerPage] = useState(1);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [customerDataTable, setCustomerDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  const [searchText, setSearchText] = useState("");
  const [sortby, setSortby] = useState("firstname");
  const [existsOnly, setExistsOnly] = useState("firstname");

  useEffect(() => {
    async function fetchFunction() {
      setIsLoadingCustomer(true);
      const { data, error } = await apiGet(
        `/api/customers/status/borrowed/credits/lastdelivery/${limit}/${customerPage}/${
          searchText ? searchText : null
        }/${sortby}/${existsOnly}`
      );
      console.log("customer data -->>>>>>>>>", data);
      if (data && !error) {
        setIsLoadingCustomer(false);
        setCustomerPage(data.data.page);
        setCustomerDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingCustomer(false);
      }
    }
    fetchFunction();
  }, [customerPage, searchText, sortby, existsOnly]);

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
                <option value="firstname">Firstname</option>
                <option value="lastname">Lastname</option>
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
                <option value="borrow.total_borrowed_gallon">Borrowers</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {isLoadingCustomer ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          minHeight="150px"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner size="xl" color="blue.200" thickness="5px" />
        </Stack>
      ) : null}
      <CustomerTable
        data={customerDataTable}
        currentPage={customerPage}
        setPage={setCustomerPage}
      />
    </div>
  );
}

export default CustomerStatusTableWrapper;
