import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import ApprovedSchedules from "../components/schedules/ApprovedSchedules";
import PendingSchedules from "../components/schedules/PendingSchedules";
import { apiGet } from "../services/api/axios.methods";
import RejectedSchedules from "../components/schedules/RejectedSchedules";

function AdminSchedules() {
  let limit = 5;
  const [approvedSchedsPage, setApprovedSchedsPage] = useState(1);
  const [isLoadingApprovedScheds, setIsLoadingApprovedScheds] = useState(false);
  const [approvedSchedsDataTable, setApprovedSchedsDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
    isLoading: true,
  });
  const [searchApproved, setSearchApproved] = useState(null);
  async function fetchApprovedSchedules() {
    setIsLoadingApprovedScheds(true);
    const { data, error } = await apiGet(
      `/api/schedules/approved/${
        searchApproved ? searchApproved : null
      }/${approvedSchedsPage}/${limit}`
    );
    //   console.log("data=>>>>>>>>>>>>>>", data);
    if (data && !error) {
      setIsLoadingApprovedScheds(false);
      setApprovedSchedsPage(data.data.page);
      setApprovedSchedsDataTable((prev) => {
        return {
          ...prev,
          data: data.data.docs,
          pages: data.data.totalPages,
        };
      });
    } else {
      setIsLoadingApprovedScheds(false);
    }
  }
  useEffect(() => {
    fetchApprovedSchedules();
  }, [searchApproved]);


//   PENDING --------->
  const [pendingSchedspage, setPendingSchedspage] = useState(1);
  const [isLoadingPendingScheds, setIsLoadingPendingScheds] = useState(false);
  const [pendingSchedsDataTable, setPendingSchedsDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
    isLoading: true,
  });

  const [searchPending, setSearchPending] = useState(null);
  async function fethcPendingSchedules() {
    setIsLoadingPendingScheds(true);
    const { data, error } = await apiGet(
      `/api/schedules/pending/${
        searchPending ? searchPending : null
      }/${pendingSchedspage}/${limit}`
    );
    //   console.log("data=>>>>>>>>>>>>>>", data);
    if (data && !error) {
      setIsLoadingPendingScheds(false);
      setPendingSchedspage(data.data.page);
      setPendingSchedsDataTable((prev) => {
        return {
          ...prev,
          data: data.data.docs,
          pages: data.data.totalPages,
        };
      });
    } else {
      setIsLoadingPendingScheds(false);
    }
  }
  useEffect(() => {
    fethcPendingSchedules();
  }, [searchPending]);


//   PENDING --------->
const [rejectedSchedulePage, setRejectedSchedulePage] = useState(1);
const [isLoadingRejectedScheds, sestIsLoadingRejectedScheds] = useState(false);
const [rejectedDataTable, setRejectedDataTable] = useState({
  pages: 1,
  page: 1,
  data: [],
  isLoading: true,
});

const [searchRejected, setSearchRejected] = useState(null);
async function fetchRejectedSchedules() {
    sestIsLoadingRejectedScheds(true);
  const { data, error } = await apiGet(
    `/api/schedules/rejected/${
        searchRejected ? searchRejected : null
    }/${rejectedSchedulePage}/${limit}`
  );
    console.log("data=>>>>>>>>>>>>>>", data);
  if (data && !error) {
    sestIsLoadingRejectedScheds(false);
    setRejectedSchedulePage(data.data.page);
    setRejectedDataTable((prev) => {
      return {
        ...prev,
        data: data.data.docs,
        pages: data.data.totalPages,
      };
    });
  } else {
    sestIsLoadingRejectedScheds(false);
  }
}
useEffect(() => {
  fetchRejectedSchedules();
}, [searchRejected]);



  console.log("pendingSchedsDataTable", pendingSchedsDataTable);
  return (
    <div className="admin-schedules">
      <div className="admin-schedules--header">
        <h1 className="admin-schedules--header__title">Schedules</h1>
        <p className="admin-schedules--header__description">Manage schedules</p>
      </div>
      <div>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Approved</Tab>
            <Tab>Pending</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isLoadingApprovedScheds ? (
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
              <ApprovedSchedules
                data={approvedSchedsDataTable}
                currentPage={approvedSchedsPage}
                setPage={setApprovedSchedsPage}
                search={searchApproved}
                setSearch={setSearchApproved}
                limit={limit}
                fetchFunction={fetchApprovedSchedules}
              />
            </TabPanel>
            <TabPanel>
              {isLoadingPendingScheds ? (
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
              <PendingSchedules
                data={pendingSchedsDataTable}
                currentPage={pendingSchedspage}
                setPage={setPendingSchedspage}
                search={searchPending}
                setSearch={setSearchPending}
                limit={limit}
                fetchFunction={fethcPendingSchedules}
              />
            </TabPanel>
            <TabPanel>
              {isLoadingRejectedScheds ? (
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
              <RejectedSchedules
                data={rejectedDataTable}
                currentPage={rejectedSchedulePage}
                setPage={setRejectedSchedulePage}
                search={searchRejected}
                setSearch={setSearchRejected}
                limit={limit}
                fetchFunction={fetchRejectedSchedules}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminSchedules;
