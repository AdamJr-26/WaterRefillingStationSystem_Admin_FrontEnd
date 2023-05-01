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
import OngoingDeliveries from "./OngoingDeliveries";
import useFetch from "../../hooks/api/useFetch";
import { apiGet } from "../../services/api/axios.methods";
import FinishedDeliveries from "./FinishedDeliveries";

function DeliveryTableWrapper() {
  let limit = 5;
  const [ongoingPage, setOngoingPage] = useState(1);
  const [isLoadingOngoing, setIsLoadingOngoing] = useState(false);
  const [ongoingDataTable, setOngoingDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  useEffect(() => {
    async function getOngoingDeliveries() {
      setIsLoadingOngoing(true);
      const { data, error } = await apiGet(
        `/api/deliveries/ongoing/${limit}/${ongoingPage}`
      );

      if (data && !error) {
        setIsLoadingOngoing(false);
        setOngoingPage(data.data.page);
        setOngoingDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingOngoing(false);
      }
    }
    getOngoingDeliveries();
  }, [ongoingPage]);

  // finished deliveries table
  const [finishedPage, setFinishedPage] = useState(1);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [finishedDataTable, setFinishedDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
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

  useEffect(() => {
    async function getFinishedDeliveries() {
      setIsLoadingFinished(true);
      const { data, error } = await apiGet(
        `/api/deliveries/finished/${limit}/${finishedPage}`
      );

      if (data && !error) {
        setIsLoadingFinished(false);
        setFinishedPage(data.data.page);
        setFinishedDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingFinished(false);
      }
    }
    getFinishedDeliveries();
  }, [finishedPage]);
  console.log("finishedDataTable->>>", finishedDataTable);
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Ongoing</Tab>
        <Tab>Finished</Tab>
      </TabList>
      <TabPanels>
        <TabPanel position="relative">
          {isLoadingOngoing ? (
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
          <OngoingDeliveries
            data={ongoingDataTable}
            currentPage={ongoingPage}
            setPage={setOngoingPage}
          />
        </TabPanel>
        <TabPanel>
          {isLoadingFinished ? (
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
          {/* <div className="delivery-data-table--header__menu">
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
          </div> */}
          <FinishedDeliveries
            data={finishedDataTable}
            currentPage={finishedPage}
            setPage={setFinishedPage}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default DeliveryTableWrapper;
