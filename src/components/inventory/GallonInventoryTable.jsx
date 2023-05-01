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
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { Doughnut, Pie } from "react-chartjs-2";
import TablePaginationButtons from "../general/TablePaginationButtons";
import UpdateGallonModal from "./Modal/UpdateGallonModal";

function GallonInventoryTable({ data, currentPage, setPage }) {
  let heading = [
    "IMAGE",
    "CHART",
    "NAME",
    "PRICE",
    "BORROWED",
    "AVAILABLE",
    "QUANTIY",
    "ACTIONS",
  ];

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

  // chart
  const options = {
    cutoutPercentage: 45,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: {
      display: false,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  // modal
  const gallonModal = useDisclosure();
  const [showItem, setShowItem] = useState({});
  const updateGallonModalToggler = (item) => {
    gallonModal.onOpen();
    setShowItem({ id: item._id, admin: item?.admin });
  };
  const toast = useToast();
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
              <Td className="tbody-tr--td" width="70px" maxHeight="70px">
                <img
                  width="40px"
                  className="tbody-tr--image"
                  src={item.gallon_image}
                  alt=""
                />
              </Td>
              <Td
                minWidth="70px"
                maxHeight="70px"
                maxWidth="70px"
                padding="0px"
                margin="auto"
              >
                <Doughnut
                  data={{
                    labels: ["Borrowed", "Available"],
                    datasets: [
                      {
                        label: "Availability",
                        data: [
                          item.borrowed[0]?.total_borrowed || 0,
                          item?.total - (item.borrowed[0]?.total_borrowed || 0),
                        ],
                        backgroundColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 0.5)",
                          "rgba(54, 162, 235, 0.5)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={options}
                />
              </Td>
              <Td>{item.name}</Td>
              <Td>₱ {item.price}</Td>
              <Td>{item.borrowed[0]?.total_borrowed || 0}</Td>
              <Td>{item?.total - (item.borrowed[0]?.total_borrowed || 0)}</Td>
              <Td>{item.total}</Td>
              <Td fontSize="14px">
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => updateGallonModalToggler(item)}>
                      Update
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
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

      <UpdateGallonModal
        isOpen={gallonModal.isOpen}
        onOpen={gallonModal.onOpen}
        onClose={gallonModal.onClose}
        showItem={showItem}
        toast={toast}
      />
    </TableContainer>
  );
}

export default GallonInventoryTable;
