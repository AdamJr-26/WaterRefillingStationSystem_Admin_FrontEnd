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
import { Icon } from "@iconify/react";
import TransactionTablePurchases from "./tables/TransactionTablePurchases";
import { apiGet } from "../../services/api/axios.methods";
import TransactionTableDebt from "./tables/TransactionTableDebt";
import TransactionTableExpenses from "./tables/TransactionTableExpenses";

function ReportsTransactions({ date }) {
  // purchases datatable
  let limit = 5;
  const [purchaseTablePage, setPurchaseTablePage] = useState(1);
  const [isLoadingPurchaseTable, setIsLoadingPurchaseTable] = useState(false);
  const [purchasesDataTable, setPurchasesDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
    isLoading: true,
  });
  useEffect(() => {
    async function getPurchaseData() {
      setIsLoadingPurchaseTable(true);
      const { data, error } = await apiGet(
        `/api/purchases/${limit}/${purchaseTablePage}/${date}`
      );

      if (data && !error) {
        setIsLoadingPurchaseTable(false);
        setPurchaseTablePage(data.data.page);
        setPurchasesDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingPurchaseTable(false);
      }
    }
    getPurchaseData();
  }, [purchaseTablePage, date]);

  // debt payments datatable
  const [debtPaymentsTablePage, setDebtPaymentsTablePage] = useState(1);
  const [isLoadingdebtPaymentsTable, setIsLoadingdebtPaymentsTable] =
    useState(false);
  const [debtPaymentsDataTable, setDebtPaymentsDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  useEffect(() => {
    async function getDebtPaymentsData() {
      setIsLoadingdebtPaymentsTable(true);
      const { data, error } = await apiGet(
        `/api/debt-payments/${limit}/${debtPaymentsTablePage}/${date}`
      );

      if (data && !error) {
        setIsLoadingdebtPaymentsTable(false);
        setDebtPaymentsTablePage(data.data.page);
        setDebtPaymentsDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingdebtPaymentsTable(false);
      }
    }
    getDebtPaymentsData();
  }, [debtPaymentsTablePage, date]);

  // expenses datatable
  const [expensesTablePage, setExpensesTablePage] = useState(1);
  const [isLoadingdebtExpensesTable, setIsLoadingdebtExpensesTable] =
    useState(false);
  const [expensesDataTable, setExpensesDataTable] = useState({
    pages: 1,
    page: 1,
    data: [],
  });
  useEffect(() => {
    async function getExpensesData() {
      setIsLoadingdebtExpensesTable(true);
      const { data, error } = await apiGet(
        `/api/expenses/${limit}/${expensesTablePage}/${date}`
      );

      if (data && !error) {
        setIsLoadingdebtExpensesTable(false);
        setExpensesTablePage(data.data.page);
        setExpensesDataTable((prev) => {
          return {
            ...prev,
            data: data.data.docs,
            pages: data.data.totalPages,
          };
        });
      } else {
        setIsLoadingdebtExpensesTable(false);
      }
    }
    getExpensesData();
  }, [debtPaymentsTablePage, date]);

  console.log("debtPaymentsDataTable", setExpensesDataTable);
  return (
    <div className="admin-report-transactions">
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem className="admin-report-transactions--items">
          <h2 className="admin-report-transactions--accordion-item-button">
            <AccordionButton
              _hover="none"
              _expanded={{ bg: "#2389DA", color: "white", height: "50px" }}
            >
              <Box as="span" flex="1" textAlign="left">
                Transactions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="admin-report-transactions-sales">
              <Tabs variant="enclosed">
                <TabList>
                  <Tab
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Purchases
                  </Tab>
                  <Tab
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Debt Payments
                  </Tab>
                  <Tab
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Expenses
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel position="relative">
                   
                    {isLoadingPurchaseTable ? (
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

                    <TransactionTablePurchases
                      data={purchasesDataTable}
                      currentPage={purchaseTablePage}
                      setPurchaseTablePage={setPurchaseTablePage}
                    />
                  </TabPanel>
                  <TabPanel position="relative">
                    {isLoadingdebtPaymentsTable ? (
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
                    <TransactionTableDebt
                      data={debtPaymentsDataTable}
                      currentPage={debtPaymentsTablePage}
                      setPage={setDebtPaymentsTablePage}
                    />
                  </TabPanel>
                  <TabPanel>
                    {isLoadingdebtExpensesTable ? (
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
                    <TransactionTableExpenses
                      data={expensesDataTable}
                      currentPage={expensesTablePage}
                      setPage={setExpensesTablePage}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ReportsTransactions;
