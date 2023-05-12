import React, { useState, useEffect } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import TablePaginationButtons from "../general/TablePaginationButtons";
import { format } from "date-fns";
import { apiDelete } from "../../services/api/axios.methods";
import SearchInput from "../general/SearchInput";
import PayCreditsModal from "../general/modal/PayCreditsModal";

import NoData from "../general/NoData";
import ListSkeletonLoading from "../general/ListSkeletonLoading";
import useFetch from "../../hooks/api/useFetch";
import { Icon } from "@iconify/react";
import transformDate from "../../utils/date.toString";
function CreditsList() {
  // set initial value of current page, total_pages, and limit per page.
  // if current page value is greater then limit then add anohter page to fetch else do not create.
  //
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const {
    data,
    error,
    mutate: mutatePagination,
    isValidating,
    isLoading,
  } = useFetch({
    url: `/api/credits/pagination/${limit}/${page}/${fromDate}/${toDate}`,
  });

  const onChangeFrom = (value) => {
    setFromDate(value);
  };
  const onChangeTo = (value) => {
    const from_date_unix = Math.floor(new Date(fromDate).valueOf() / 1000);
    if (Math.floor(new Date(value).valueOf() / 1000) > from_date_unix) {
      setToDate(value);
    } else {
      console.log("Select date from 1 day apart.");
    }
  };
  const clearDate = () => {
    setFromDate(null);
    setToDate(null);
  };
  useEffect(() => {
    const from_date_unix = Math.floor(new Date(fromDate).valueOf() / 1000);
    const to_date_unix = Math.floor(new Date(toDate).valueOf() / 1000);
    console.log("to_date_unix", to_date_unix);
    if (to_date_unix > from_date_unix) {
      setPage(1);
      mutatePagination();
    } else {
    }
  }, [fromDate, toDate]);

  // modal
  const [selectedCredit, setSelectedCredit] = useState(null);
  const paycreditsClosure = useDisclosure();

  // Number of buttons to show in the pagination
  const buttonsToShow = 5;
  // Calculate the range of buttons to display
  const startRange = Math.max(1, page - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(
    data?.data?.totalPages,
    startRange + buttonsToShow - 1
  );

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    pages.push(i);
  }
  const sampleCredit = [
    {
      customer: {
        fullname: "Adam Marcaida",
        type: "regular",
      },
      credits: [
        {
          _id: "356",
          gallon: "small gallon",
          unitPrice: 25,
          quantity: 1,
          totalPrice: 25,
        },
      ],
    },
  ];
  let heading = ["GALLON", "QUANTITY", "UNIT PRICE", "TOTAL PRICE"];
  return (
    <div>
      <Accordion allowToggle display="flex" flexDirection="column" gap="5px">
        {sampleCredit.map((credit, key) => (
          <AccordionItem borderRadius="15px" border="1px solid #d1d5db">
            <div>
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
                  <img
                    src="https://www.shutterstock.com/image-photo/name-word-written-on-wood-260nw-1862388424.jpg"
                    alt=""
                  />
                  <div className="schedules-lists-information-customer">
                    <p className="schedules-lists-information-customer--name">
                      Adam Marcaida
                    </p>
                    <p className="schedules-lists-information-customer--type">
                      regular
                    </p>
                  </div>
                </div>
                <AccordionIcon />
              </AccordionButton>
            </div>
            <AccordionPanel pb={4}>
              <TableContainer padding="0px 15px">
                {credit.credits.map((cred, i) => (
                  <div key={i}>
                    <div className="schedules-lists-table-panel">
                      <p className="schedules-lists-table-panel--date">
                        {format(new Date(), "MMM-dd-yy")}
                      </p>
                      <button className="schedules-lists-table-panel--delete">
                        Pay
                      </button>
                    </div>
                    <Table>
                      <Thead>
                        <Tr>
                          {heading.map((head, i) => (
                            <Th key={i}>{head}</Th>
                          ))}
                        </Tr>
                      </Thead>
                      <Tbody>
                        
                      </Tbody>
                    </Table>
                  </div>
                ))}
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CreditsList;
