import React, { useState, useEffect } from "react";
import AdminEmployeesDataTableDeliveryPersonnels from "../components/employees/AdminEmployeesDataTableDeliveryPersonels";
import { Icon } from "@iconify/react";
import { useDisclosure ,Stack, Spinner} from "@chakra-ui/react";
import AdminEmployeesNewPersonnelModal from "../components/employees/AdminEmployeesNewPersonnelModal";
import usePersonnels from "../hooks/api/usePersonnels";
import SalesAchievementCard from "../components/employees/SalesAchievementCard";
import { eachMonthOfInterval, startOfYear, endOfYear } from "date-fns";
import transformDate from "../utils/date.toString";
import useFetch from "../hooks/api/useFetch";
import NoData from "../components/general/NoData";
import { apiGet } from "../services/api/axios.methods";
function AdminEmployess() {
  const newPersonelClosure = useDisclosure();
  let limit = 5;
  const [personnelPage, setPersonnelPage] = useState(1);
  const [isLoadingPersonnel, setIsLoadingPersonnel] = useState(false);
  const [personnelDataTable, setPersonnelDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  useEffect(() => {
    async function getOngoingDeliveries() {
      setIsLoadingPersonnel(true);
      const { data, error } = await apiGet(
        `/api/delivery-personnels/${limit}/${personnelPage}`
      );
      console.log("delivery personnels ->>>>>", data);
      if (data && !error) {
        setIsLoadingPersonnel(false);
        setPersonnelPage(data.data.page);
        setPersonnelDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingPersonnel(false);
      }
    }
    getOngoingDeliveries();
  }, [personnelPage]);

  // get days of the month
  const [selectedDate, setSelectedDate] = useState(new Date());

  // monthds of the year
  const startYear = startOfYear(new Date());
  const endYear = endOfYear(new Date());
  const months = eachMonthOfInterval({ start: startYear, end: endYear });
  console.log("months", months);
  const [top, setTop] = useState(3);
  const { data, error } = useFetch({
    url: `/api/personnel/sales/achievements/${
      transformDate(selectedDate).y_m_d
    }/${top}`,
  });
  console.log("datadatadatadata", data);
  return (
    <div className="admin-employees-page">
      <div className="admin-employees-page-sales-achievement">
        <div className="admin-employees-page-sales-achievement--header">
          <p>Sales Achievement</p>
          <select
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            name="date"
            id="date"
            className="admin-reports--query-option__select-date"
          >
            {months.map((date, i) =>
              new Date().getMonth() + 1 === transformDate(date).month ? (
                <option selected key={i} value={date}>
                  {transformDate(date).monthName}
                </option>
              ) : (
                <option key={i} value={date}>
                  {transformDate(date).monthName}
                </option>
              )
            )}
          </select>
          <div className="admin-employees-page-sales-achievement--header__top">
            <p>Top</p>
            <input
              type="text"
              placeholder="0"
              value={top}
              onChange={(e) => setTop(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-employees-page-sales-achievement--personnel-cards">
          {data?.data?.length ? (
            data.data.map((personnel, i) => (
              <SalesAchievementCard key={i} data={personnel} />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>
      <div className="admin-employee-personel-table">
        <div className="personel-search-new-wrapper">
          <div className="personel-search-new-wrapper--header">
            <p className="personel-search-new-wrapper--header__title">
              Delivery Personnels
            </p>
            <p className="personel-search-new-wrapper--header__description">
              Manage your delivery personnels.
            </p>
          </div>
          <div className="personel-search-new-wrapper--search-new-personel">
            {/* <div className="personel-search-new-wrapper--search-new-personel__search">
              <button>
                <Icon icon="ic:baseline-search" />
              </button>
            </div> */}
            <div className="personel-search-new-wrapper--search-new-personel__new-personel">
              <button onClick={newPersonelClosure.onOpen}>
                <Icon icon="material-symbols:add" /> New Personnel
              </button>
              <AdminEmployeesNewPersonnelModal
                isOpen={newPersonelClosure.isOpen}
                onOpen={newPersonelClosure.onOpen}
                onClose={newPersonelClosure.onClose}
              />
            </div>
          </div>
        </div>
        {isLoadingPersonnel ? (
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
        <AdminEmployeesDataTableDeliveryPersonnels
          data={personnelDataTable}
          currentPage={personnelPage}
          setPage={setPersonnelPage}
        />
      </div>
    </div>
  );
}

export default AdminEmployess;
