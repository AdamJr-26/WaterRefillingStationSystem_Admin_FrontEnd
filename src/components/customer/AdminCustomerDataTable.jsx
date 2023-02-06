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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import transformDate from "../../utils/date.toString";
import { Icon } from "@iconify/react";
import NoData from "../general/NoData";
import CustomerPersonalInfo from "./modal/CustomerPersonalInfo";
function AdminCustomerDataTable({ data, error, isValidating, setSortby }) {
  // MODAL
  const customerInfoDC = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const onClickCustomer = (customer) => {
    setSelectedCustomer(customer);
    customerInfoDC.onOpen();
  };
  // FETCH DELIVERIES WITH APPROVED:TRUE, RETURNED:FALSE
  const thead = [
    { name: "IMAGE", fieldName: "firstname" },
    { name: "NAME", fieldName: "firstname" },
    { name: "MOBILE", fieldName: "firstname" },
    { name: "TYPE", fieldName: "firstname" },
    { name: "SCHEDULES", fieldName: "firstname" },
    { name: "CREDIT ", fieldName: "firstname" },
    { name: "BORROWED ", fieldName: "firstname" },
    { name: "LAST DELIVERY", fieldName: "firstname" },
    { name: "MENU", fieldName: "firstname" },
  ];

  if (!data && !error && isValidating) {
    return <div>Loading.....</div>;
  } else if (data && !error && !isValidating) {
    if (data.data.length) {
      return (
        <TableContainer
          overflowX="auto"
          overflowY="hidden"
          display="block"
          whiteSpace="nowrap"
          className="chakra-table-container"
        >
          <CustomerPersonalInfo
            isOpen={customerInfoDC.isOpen}
            onOpen={customerInfoDC.onOpen}
            onClose={customerInfoDC.onClose}
            selectedCustomer={selectedCustomer}
          />
          <Table>
            <Thead className="chakra-table-container--table__thead">
              <Tr className="thead--tr">
                {thead?.map((title) => (
                  <Th className="thead--tr__th" key={title.name}>
                    {title.name}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody className="chakra-table-container--table__tbody">
              {data?.data?.map((customer, i) => (
                <Tr
                  onClick={() => onClickCustomer(customer)}
                  key={i}
                  className="tbody-tr"
                >
                  <Td className="tbody-tr--td">
                    <img
                      className="tbody-tr--image"
                      src={customer?.display_photo}
                      alt=""
                    />
                  </Td>
                  <Td>{customer.firstname + " " + customer.lastname}</Td>
                  <Td>{customer.mobile_number}</Td>
                  <Td>{customer.customer_type}</Td>
                  {customer?.schedules[0] ? (
                    <Td>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        {
                          transformDate(
                            customer?.schedules[0]?.schedule.utc_date
                          ).string_date
                        }
                      </p>
                    </Td>
                  ) : (
                    <Td>
                      <p>No Schedule</p>
                    </Td>
                  )}
                  <Td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ margin: "0px 5px" }}>
                        <p style={{ fontSize: 12, color: "green" }}>
                          Total amount
                        </p>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "19px",
                            textAlign: "center",
                          }}
                        >
                          {customer.credit[0]?.total_credit_amount || 0}
                        </p>
                      </div>
                      <div style={{ margin: "0px 5px" }}>
                        <p style={{ fontSize: 12, color: "green" }}>
                          Total gallons
                        </p>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "19px",
                            textAlign: "center",
                          }}
                        >
                          {customer.credit[0]?.total_credited_gallon || 0}
                        </p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "19px",
                        textAlign: "center",
                      }}
                    >
                      {customer.borrow[0]?.total_borrowed_gallon || 0}
                    </p>
                  </Td>
                  {customer?.last_delivery[0] ? (
                    <Td>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        {
                          transformDate(
                            customer?.last_delivery[0]?.date.utc_date
                          ).string_date
                        }
                      </p>
                    </Td>
                  ) : (
                    <Td>
                      <p>No Delivery</p>
                    </Td>
                  )}
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={
                          <Icon
                            icon="carbon:overflow-menu-vertical"
                            size={32}
                          />
                        }
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem icon={<DeleteIcon />}>
                          Delete customer
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else {
      return <NoData />;
    }
  } else {
    return (
      <div>
        <p>Error, click to refresh.</p>
      </div>
    );
  }
}

export default AdminCustomerDataTable;
