import React, { useState, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import useSWR, { useSWRConfig } from "swr";

function AdminEmployeesDataTableDeliveryPersonels({ data }) {
  const personelHeader = [
    "IMAGE",
    "FULL NAME",
    "NICKNAME",
    "PHONE NUMBER",
    "EMAIL",
    "STATUS",
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

  // MODAL
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showItem, setShowItem] = useState({});
  const handleModal = (item) => {
    onOpen();
    setShowItem({ id: item._id, admin: item?.admin });
  };

console.log("currentItems",currentItems)
  return (
    <div>
      <TableContainer
        overflowX="auto"
        overflowY="hidden"
        display="block"
        whiteSpace="nowrap"
        className="chakra-table-container"
      >
        {/* <ItemModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          showItem={showItem}
        /> */}

        <Table size="sm" className="chakra-table-container--table">
          <Thead className="chakra-table-container--table__thead">
            <Tr className="thead--tr">
              {personelHeader?.map((title) => (
                <Th className="thead--tr__th" key={title}>
                  {title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="chakra-table-container--table__tbody">
            {currentItems?.map((personel) => (
              <Tr
                className="tbody-tr"
                key={personel._id}
                onClick={() => handleModal(personel)}
              >
                <Td className="tbody-tr--td">
                  <img
                    className="tbody-tr--image"
                    src={personel?.display_photo}
                    alt=""
                  />
                </Td>
                <Td>
                  {personel.firstname} {personel?.lastname}
                </Td>
                <Td>{personel?.nickname}</Td>
                <Td>{personel?.contact_number}</Td>
                <Td>{personel?.gmail}</Td>
                <Td>{personel?.on_delivery}</Td>

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
                      <MenuItem icon={<DeleteIcon />}>Remove</MenuItem>
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
    </div>
  );
}

export default AdminEmployeesDataTableDeliveryPersonels;
