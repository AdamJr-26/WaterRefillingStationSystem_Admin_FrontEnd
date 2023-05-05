import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import SearchInput from "../general/SearchInput";
import { format } from "date-fns";
import { apiPut } from "../../services/api/axios.methods";
import { Icon } from "@iconify/react";
import { apiDelete } from "../../services/api/axios.methods";
function RejectedSchedules({
  data,
  currentPage,
  setPage,
  searh,
  setSearch,
  fetchFunction,
}) {
  const buttonsToShow = 5; // Number of buttons to show in the pagination

  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(data.pages, startRange + buttonsToShow - 1);

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    console.log("endRange--------", endRange);
    pages.push(i);
  }
  let heading = ["GALLON", "QUANTITY"];

  return (
    <div className="schedules-lists">
      <div>
        <SearchInput searh={searh} setSearch={setSearch} />
      </div>
      <div>
        <div className="schedules-lists--info-header">
          <p>Customer Info</p>
          <p>Actions</p>
        </div>
        <Accordion allowToggle display="flex" flexDirection="column" gap="5px">
          {data?.data?.map((sched, i) => (
            <AccordionItem
              key={i}
              borderRadius="15px"
              border="1px solid #d1d5db"
            >
              <div className="schedules-lists--header">
                <AccordionButton
                  _expanded={{
                    bg: "#2389DA",
                    color: "white",
                    height: "50px",
                    paddingY: "10",
                    borderRadius: "10px",
                  }}
                >
                  <div className="schedules-lists--header__information">
                    <img src={sched.customer.display_photo} alt="customer" />
                    <div className="schedules-lists-information-customer">
                      <p className="schedules-lists-information-customer--name">
                        {sched.customer.fullname}
                      </p>
                      <p className="schedules-lists-information-customer--type">
                        {sched.customer.type}
                      </p>
                    </div>
                  </div>
                  <AccordionIcon />
                </AccordionButton>
              </div>
              <AccordionPanel pb={4}>
                <TableContainer padding="10px 0px">
                  <div key={i} className="schedules-lists-table-panel">
                    <p className="schedules-lists-table-panel--date">
                      {format(new Date(sched.date.utc_date), "MMM-dd-yy")}
                    </p>
                  </div>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        {heading.map((head, i) => (
                          <Th key={i}>{head}</Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sched?.items?.map((item, i) => (
                        <Tr>
                          <Td>{item[0].name}</Td>
                          <Td>{item[0].quantity}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default RejectedSchedules;
