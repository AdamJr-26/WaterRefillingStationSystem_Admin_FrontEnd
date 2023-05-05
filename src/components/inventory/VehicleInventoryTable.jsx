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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { Doughnut, Pie } from "react-chartjs-2";
import TablePaginationButtons from "../general/TablePaginationButtons";
let heading = ["IMAGE", "VEHICLE ID / PLATE NO.", "NAME", "STATUS"];
function VehicleInventoryTable({ data, currentPage, setPage }) {
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
          {data?.data.map((item, i) => (
            <Tr key={i}>
              <Td fontSize="14px" width="50px">
                <img width="50px" src={item.vehicle_image} alt="" />
              </Td>
              <Td>{item.vehicle_id}</Td>
              <Td>{item.vehicle_name}</Td>
              <Td>
                {item.isAvailable ? (
                  <Tag variant="solid" colorScheme="green">
                    Available
                  </Tag>
                ) : (
                  <Tag variant="solid" colorScheme="orange">
                    Busy
                  </Tag>
                )}
              </Td>
              {/* <Td fontSize="14px">
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Remove</MenuItem>
                    <MenuItem>Update</MenuItem>
                  </MenuList>
                </Menu>
              </Td> */}
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
    </TableContainer>
  );
}

export default VehicleInventoryTable;
