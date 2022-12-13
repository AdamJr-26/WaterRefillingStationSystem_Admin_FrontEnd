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
function AdminDeliveryDataTableOngoing() {
    // FETCH DELIVERIES WITH APPROVED:TRUE, RETURNED:FALSE
  const deliveryThead = [
    "IMAGE",
    "NAME",
    "NUMBER",
    "VEHICLE",
    "DELIVERED GLN",
    "RETURNED GLN",
    "CREDITED GLN",
    "PAID",
    "SALES",
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
            {deliveryThead?.map((title) => (
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

export default AdminDeliveryDataTableOngoing;
