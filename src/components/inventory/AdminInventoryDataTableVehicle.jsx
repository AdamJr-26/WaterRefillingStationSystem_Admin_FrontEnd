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
import { Icon } from "@iconify/react";

function AdminInventoryDataTableVehicle({ data }) {
  const gallonThead = [
    "Image",
    "Vehicle ID / Plate Number",
    "Vehicle Name",
    "Available",
    "ACTION",
  ];

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(5);
  const indexOfLastItem = page * limitPerPage;
  const indexOfFirstItem = indexOfLastItem - limitPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem); // data should change for every table;
  const totalItems = data?.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / limitPerPage); i++) {
    pageNumbers.push(i);
  }
  // modal, menu options
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <TableContainer
      overflowX="auto"
      overflowY="hidden"
      display="block"
      whiteSpace="nowrap"
      className="chakra-table-container"
    >
      <Table size="sm" className="chakra-table-container--table">
        <Thead className="chakra-table-container--table__thead">
          <Tr className="thead--tr">
            {gallonThead?.map((title) => (
              <Th className="thead--tr__th" key={title}>
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="chakra-table-container--table__tbody">
          {currentItems?.map((item) => (
            <Tr className="tbody-tr" key={item._id}>
              <Td className="tbody-tr--td">
                <img
                  className="tbody-tr--image"
                  src={item.vehicle_image}
                  alt=""
                />
              </Td>
              <Td>{item.vehicle_id}</Td>
              <Td>{item.vehicle_name}</Td>
              <Td className={item.available ? "good" : "warning"}>
                {item.available ? "YES" : "NO"}
              </Td>
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
        <Tfoot className="chakra-table-container--table__tfoot">
          <Tr className="tfoot-tr">
            {pageNumbers.map((num) => (
              <Th
                key={num}
                className={
                  num === page
                    ? "tfoot-tr--active-page tfoot-tr--th"
                    : "tfoot-tr--th"
                }
                onClick={() => setPage(num)}
              >
                {num}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default AdminInventoryDataTableVehicle;
