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
function AdminCustomerDataTable() {
    // FETCH DELIVERIES WITH APPROVED:TRUE, RETURNED:FALSE
    const thead = [
        "IMAGE",
        "NAME",
        "MOBILE",
        "TYPE",
        "SCHEDULES",
        "CREDIT STATUS",
        "BORROWED STATUS",
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
      </Table>
    </TableContainer>
  );
}

export default AdminCustomerDataTable;
