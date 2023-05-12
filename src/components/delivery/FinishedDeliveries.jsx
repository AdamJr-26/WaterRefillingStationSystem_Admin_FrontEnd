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
import TablePaginationButtons from "../general/TablePaginationButtons";
import DeliveryProgressModal from "./modal/DeliveryProgressModal";
import { Icon } from "@iconify/react";

function FinishedDeliveries({ data, currentPage, setPage }) {
  let heading = [
    "IMAGE",
    "DELIVERY PERSONNEL",
    "MOBILE NUMBER",
    "DATE",
    "VEHICLE ID",
    "STATUS",
    "ACTIONS",
  ];
  const buttonsToShow = 5; // Number of buttons to show in the pagination

  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endRange = Math.min(data.pages, startRange + buttonsToShow - 1);

  const pages = [];
  for (let i = startRange; i <= endRange; i++) {
    console.log("endRange--------", endRange);
    pages.push(i);
  }

  const [delivery, setDelivery] = useState();
  const progressModalClosure = useDisclosure();

  const showDeliveryDetail = (item) => {
    setDelivery(item);
    progressModalClosure.onOpen();
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of all ongoing deliveries.</TableCaption>
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
                <img width="70px" src={item.personnel.display_photo} alt="" />
              </Td>
              <Td fontSize="14px">{item.personnel.fullname}</Td>
              <Td fontSize="14px">{item.personnel.contact_number}</Td>
              <Td fontSize="14px" width="200px">
                {format(
                  new Date(item.date_of_creation.utc_date),
                  "MMMM d, yyyy"
                )}
              </Td>
              <Td fontSize="14px">{item.vehicle.vehicle_id}</Td>
              <Td fontSize="14px">
                <Tag variant="solid" colorScheme="green">
                  Finished
                </Tag>
              </Td>
              <Td fontSize="14px">
                <Stack direction="row" spacing={4}>
                  <Button
                    onClick={() => showDeliveryDetail(item)}
                    leftIcon={<Icon icon="material-symbols:more-rounded" />}
                    colorScheme="blue"
                    // backgroundColor="#2389DA"
                    variant="outline"
                  >
                    More
                  </Button>
                </Stack>
              </Td>
              {/* <DeliveryProgressModal
                isOpen={progressModalClosure.isOpen}
                onOpen={progressModalClosure.onOpen}
                onClose={progressModalClosure.onClose}
                deliveryId={item._id}
              /> */}
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
      <DeliveryProgressModal
        isOpen={progressModalClosure.isOpen}
        onOpen={progressModalClosure.onOpen}
        onClose={progressModalClosure.onClose}
        deliveryId={delivery?._id}
      />
    </TableContainer>
  );
}
export default FinishedDeliveries;
