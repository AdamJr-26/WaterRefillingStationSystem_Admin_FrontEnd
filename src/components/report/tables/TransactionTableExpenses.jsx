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
} from "@chakra-ui/react";
import { format } from "date-fns";
import TablePaginationButtons from "../../general/TablePaginationButtons";

function TransactionTableExpenses({ data, currentPage, setPage, limit }) {
  const buttonsToShow = 5; // Number of buttons to show in the pagination

  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(data.pages, startRange + buttonsToShow - 1);

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    console.log("endRange--------", endRange);
    pages.push(i);
  }
  let heading = ["DATE", "TITLE", "AMOUNT", "DESCRIPTION"];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          This is just a list of expenses that have been made up to the selected
          date,
        </TableCaption>
        <Thead backgroundColor="gray.100">
          <Tr>
            {heading.map((headerName, i) => (
              <Th key={i}>{headerName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((item, i) => (
            <Tr key={i}>
             
              <Td fontSize="14px">
                {format(new Date(item.date.utc_date), "MMMM d, yyyy")}
              </Td>
              <Td fontSize="14px">{item.title}</Td>
              <Td fontSize="14px">{item.amount}</Td>
              <Td fontSize="14px">{item.description}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {data.data.length  ? (
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

export default TransactionTableExpenses;
