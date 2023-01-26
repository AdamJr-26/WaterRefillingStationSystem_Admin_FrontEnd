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

function AdminCustomerDataTable({ data }) {
  // FETCH DELIVERIES WITH APPROVED:TRUE, RETURNED:FALSE
  const thead = [
    "IMAGE",
    "NAME",
    "MOBILE",
    "TYPE",
    "SCHEDULES",
    "CREDIT ",
    "BORROWED ",
    "LAST DELIVERY",
    "MENU",
  ];

  return (
    <TableContainer
      overflowX="auto"
      overflowY="hidden"
      display="block"
      whiteSpace="nowrap"
      className="chakra-table-container"
    >
      <Table>
        <Thead className="chakra-table-container--table__thead">
          <Tr className="thead--tr">
            {thead?.map((title) => (
              <Th className="thead--tr__th" key={title}>
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="chakra-table-container--table__tbody">
          {data?.data?.map((customer) => (
            <Tr className="tbody-tr">
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
              <Td>{"schedule"}</Td>
              <Td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ margin: "0px 5px" }}>
                    <p style={{ fontSize: 12, color: "green" }}>Total amount</p>
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
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                      <Icon icon="carbon:overflow-menu-vertical" size={32} />
                    }
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default AdminCustomerDataTable;
