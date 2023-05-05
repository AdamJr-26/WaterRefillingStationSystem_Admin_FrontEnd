import React, { useState } from "react";
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
import TablePaginationButtons from "../general/TablePaginationButtons";
import { format } from "date-fns";
import { apiDelete } from "../../services/api/axios.methods";
function ApprovedSchedules({
  data,
  currentPage,
  setPage,
  search,
  setSearch,
  limit,
  fetchFunction,
}) {
  const buttonsToShow = 5; // Number of buttons to show in the pagination
  const toast = useToast();
  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(data.pages, startRange + buttonsToShow - 1);

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    console.log("endRange--------", endRange);
    pages.push(i);
  }
  let heading = ["GALLON", "QUANTITY"];
  async function deleteSchedule(schedule_id) {
    const { data, error } = await apiDelete({
      url: `/api/schedule/${schedule_id}`,
    });
    if (data && !error) {
      fetchFunction();
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="green" borderRadius="10">
            Deleted schedule successfully.
          </Box>
        ),
      });
    } else {
      fetchFunction();
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="red" borderRadius="10">
            Cannot delete this schedule this time.
          </Box>
        ),
      });
    }
  }
  console.log("schedules--->>>", data);
  return (
    <div className="schedules-lists">
      <div>
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div>
        <div className="schedules-lists--info-header">
          <p>Customer Info</p>
        </div>
        <Accordion allowToggle display="flex" flexDirection="column" gap="5px">
          {data?.data?.map((item, i) => (
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
                    <img src={item.customer.display_photo} alt="" />
                    <div className="schedules-lists-information-customer">
                      <p className="schedules-lists-information-customer--name">
                        {item.customer.fullname}
                      </p>
                      <p className="schedules-lists-information-customer--type">
                        {item.customer.type}
                      </p>
                    </div>
                  </div>
                  <AccordionIcon />
                </AccordionButton>
              </div>
              <AccordionPanel pb={4}>
                <TableContainer padding="0px 15px">
                  {item?.schedules?.map((sched, i) => (
                    <>
                      <div key={i} className="schedules-lists-table-panel">
                        <p className="schedules-lists-table-panel--date">
                          {format(new Date(sched.date.utc_date), "MMM-dd-yy")}
                        </p>
                        <button
                          onClick={() => deleteSchedule(sched._id)}
                          className="schedules-lists-table-panel--delete"
                        >
                          Delete
                        </button>
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
                          {sched.items.map((gallon, i) => (
                            <Tr key={i}>
                              <Td width="150px">{gallon[0].name}</Td>
                              <Td width="150px">{gallon[0].quantity}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </>
                  ))}
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          ))}

          <div>
            {data.data.length && data.data.length > limit ? (
              <TablePaginationButtons
                pages={pages}
                setPage={setPage}
                currentPage={currentPage}
                totalPages={data.pages}
              />
            ) : null}
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default ApprovedSchedules;
