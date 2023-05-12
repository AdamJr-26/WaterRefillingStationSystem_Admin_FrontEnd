import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import transformDate from "../../utils/date.toString";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { Doughnut, Pie } from "react-chartjs-2";
import TablePaginationButtons from "../general/TablePaginationButtons";
import CustomerPersonalInfo from "./modal/CustomerPersonalInfo";
import { Icon } from "@iconify/react";
function CustomerTable({ data, currentPage, setPage }) {
  let heading = [
    "IMAGE",
    "NAME",
    "MOBILE",
    "TYPE",
    "SCHEDULES",
    "LAST DELIVERY",
    "ACTION",
  ];
  // Number of buttons to show in the pagination
  const buttonsToShow = 5;

  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(data.pages, startRange + buttonsToShow - 1);

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    console.log("endRange--------", endRange);
    pages.push(i);
  }

  // modal
  const customerModal = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const showCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    customerModal.onOpen();
  };

  return (
    <TableContainer>
      <Table variant="simple">
        {/* <TableCaption>Tracks gallons accurately</TableCaption> */}
        <Thead backgroundColor="gray.100">
          <Tr>
            {heading.map((headerName, i) => (
              <Th key={i}>{headerName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.data?.map((customer, i) => (
            <Tr key={i}>
              <Td fontSize="14px" width="50px">
                <img width="50px" src={customer?.display_photo} alt="" />
              </Td>
              <Td>{customer.firstname + " " + customer.lastname}</Td>
              <Td>{customer.mobile_number || "N/A"}</Td>
              <Td>{customer.customer_type || "N/A"}</Td>
              {customer?.schedules[0] ? (
                <Td>
                  <p
                    style={{
                      // fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {
                      transformDate(customer?.schedules[0]?.schedule.utc_date)
                        .string_date
                    }
                  </p>
                </Td>
              ) : (
                <Td>
                  <p>No Schedule</p>
                </Td>
              )}
              {/* <Td>
                <p
                  style={{
                    // fontWeight: 600,
                    fontSize: "16px",
                    // textAlign: "center",
                  }}
                >
                  ₱ {customer.credit[0]?.total_credit_amount || 0}
                </p>
              </Td> */}
              {/* <Td>
                <p
                  style={{
                    // fontWeight: 600,
                    fontSize: "16px",
                    // textAlign: "center",
                  }}
                >
                  {customer.borrow[0]?.total_borrowed_gallon || 0}
                </p>
              </Td> */}
              {customer?.last_delivery[0] ? (
                <Td>
                  <p
                    style={{
                      // fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {
                      transformDate(customer?.last_delivery[0]?.date.utc_date)
                        .string_date
                    }
                  </p>
                </Td>
              ) : (
                <Td>
                  <p>No Delivery</p>
                </Td>
              )}
              <Td fontSize="14px">
                <Stack direction="row" spacing={4}>
                  <Button
                    onClick={() => showCustomerDetails(customer)}
                    leftIcon={<Icon icon="material-symbols:more-rounded" />}
                    colorScheme="blue"
                    // backgroundColor="#2389DA"
                    variant="outline"
                  >
                    More
                  </Button>
                </Stack>
                {/* <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => showCustomerDetails(customer)}>
                      Show Details
                    </MenuItem>
                  </MenuList>
                </Menu> */}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {data.data?.length ? (
            <TablePaginationButtons
              pages={pages}
              setPage={setPage}
              currentPage={currentPage}
              totalPages={data.pages}
            />
          ) : null}
        </Tfoot>
      </Table>

      <CustomerPersonalInfo
        isOpen={customerModal.isOpen}
        onOpen={customerModal.onOpen}
        onClose={customerModal.onClose}
        selectedCustomer={selectedCustomer}
      />
    </TableContainer>
  );
}

export default CustomerTable;
