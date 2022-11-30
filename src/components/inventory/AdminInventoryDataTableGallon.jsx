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
} from "@chakra-ui/react";
import useGallon from "../../hooks/api/useGallon";
import { Icon } from "@iconify/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../TextInput";
import useSWR, { useSWRConfig } from "swr";

// API
import { updateGallon } from "../../services/api/inventory/inventory.post";
function AdminInventoryGallon({ data }) {
  const gallonThead = [
    "Image",
    "Gallon Name",
    "Borrowed",
    "Available",
    "Total",
  ];

  // we just edit here some data before putting in table.
  const dataTr = (data) => {
    let value = [];
    for (let i = 0; i < data?.length; i++) {
      const total = data[i]?.total;
      const borrowed = data[i].borrowed;
      data[i].available = total - borrowed;
      value.push(data[i]);
    }
    return value;
  };
  dataTr(data);

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(5);
  const indexOfLastItem = page * limitPerPage;
  const indexOfFirstItem = indexOfLastItem - limitPerPage;
  const currentItems = dataTr(data).slice(indexOfFirstItem, indexOfLastItem); // data should change for every table;
  const totalItems = dataTr(data).length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / limitPerPage); i++) {
    pageNumbers.push(i);
  }

  // modal;=================================
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showItem, setShowItem] = useState({});
  const handleModal = (item) => {
    onOpen();
    setShowItem({ id: item._id, admin: item?.admin });
  };

  function ItemModal({ isOpen, onOpen, onClose, showItem }) {
    const id = showItem?.id;
    const admin = showItem?.admin;
    // fetch
    if (id && admin && isOpen) {
      const { gallon, gallonError } = useGallon({
        url: `/api/gallon/${id}/${admin}`,
      });
      const data = gallon?.data;
      const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
      const [isUpdatingAdd, setIsUpdatingAdd] = useState(false);
      const [isUpdatingReduce, setIsUpdatingReduce] = useState(false);

      // update
      // delete
      const { mutate } = useSWRConfig();
      const updatePrice = {
        initialValues: {
          price: "",
        },
        validationSchema: Yup.object().shape({
          price: Yup.number()
            .max(1000, "Price must not exceed 1000")
            .required("Price is required."),
        }),
        onSubmit: async (values, { resetForm }) => {
          setIsUpdatingPrice(true);
          const { updatedGallon, error } = await updateGallon({
            url: `/api/gallon/price/${data?._id}/${data?.admin}`,
            payload: values,
          });
          resetForm({ values: "" });
          setIsUpdatingPrice(false);
          responseHandler(updatedGallon, error);
        },
      };
      const addCount = {
        initialValues: {
          add_count: "",
        },
        validationSchema: Yup.object().shape({
          add_count: Yup.number()
            .max(1000, "Add count must not exceed 1000")
            .required("Add count is required."),
        }),
        onSubmit: async (values, { resetForm }) => {
          setIsUpdatingAdd(true);
          const { updatedGallon, error } = await updateGallon({
            url: `/api/gallon/add/${data?._id}/${data?.admin}`,
            payload: values,
          });
          resetForm({ values: "" });
          responseHandler(updatedGallon, error);
          setIsUpdatingAdd(false);
        },
      };
      const reduceCount = {
        initialValues: {
          reduce_count: "",
        },
        validationSchema: Yup.object().shape({
          reduce_count: Yup.number()
            .max(1000, "Reduce count must not exceed 1000")
            .required("Reduce count is required."),
        }),
        onSubmit: async (values, { resetForm }) => {
          setIsUpdatingReduce(true);
          const { updatedGallon, error } = await updateGallon({
            url: `/api/gallon/reduce/${data?._id}/${data?.admin}`,
            payload: values,
          });
          resetForm({ values: "" });
          responseHandler(updatedGallon, error);
          setIsUpdatingReduce(false);
        },
      };
      const responseHandler = (data, error) => {
        console.log('dataaaa',data)
        if (data && !error) {
          mutate("/api/gallons");
          // toast
          toast({
            title: "Updated Gallon",
            description: "You just updated a gallon",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Oops",
            description: "Sorry something went wrong",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>Update Gallon</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <h1>{showItem._id}</h1>
              </ModalBody>
              <div className="update-inventory-gallon-modal">
                <div className="update-inventory-gallon-modal--gallon-info">
                  <div className="update-inventory-gallon-modal--gallon-info__info">
                    <img
                      className="gallon-image"
                      src={data?.gallon_image}
                      alt=""
                    />
                    <p className="gallon-name">{data?.name}</p>
                    <p className="gallon-liters">{data?.liter} Liter(s)</p>
                  </div>
                  <div className="update-inventory-gallon-modal--gallon-info__total">
                    <div className="gallon-price-tag">
                      <p>Price</p>
                      <p>₱ {data?.price}</p>
                    </div>
                    <div className="grallon-total-tag">
                      <p>Total</p>
                      <p>{data?.total}</p>
                    </div>
                  </div>
                </div>
                <div className="update-inventory-gallon-modal--update">
                  <div className="update-inventory-gallon-modal--update__note">
                    <Icon icon="mdi:warning-octagon-outline" color="red" />
                    <p>
                      Note: Changing price can affect different in different
                      ways.
                    </p>
                  </div>
                  <Formik {...updatePrice}>
                    <Form className="update-inventory-gallon-modal--update__update-gallon-inputs">
                      <TextInput
                        label="Change Price"
                        name="price"
                        placeholder="0"
                        type="number"
                      />
                      <Button
                        isLoading={isUpdatingPrice}
                        loadingText="Updating..."
                        type="submit"
                        marginLeft="5px"
                        colorScheme="blue"
                        mr={3}
                      >
                        Update
                      </Button>
                    </Form>
                  </Formik>

                  <Formik {...addCount}>
                    <Form className="update-inventory-gallon-modal--update__update-gallon-inputs">
                      <TextInput
                        label="Add Count"
                        name="add_count"
                        placeholder="0"
                        type="number"
                      />
                      <Button
                        isLoading={isUpdatingAdd}
                        loadingText="Updating..."
                        type="submit"
                        marginLeft="5px"
                        colorScheme="blue"
                        mr={3}
                      >
                        Update
                      </Button>
                    </Form>
                  </Formik>

                  <Formik {...reduceCount}>
                    <Form className="update-inventory-gallon-modal--update__update-gallon-inputs">
                      <TextInput
                        label="Reduce Count"
                        name="reduce_count"
                        placeholder="0"
                        type="number"
                      />
                      <Button
                        isLoading={isUpdatingReduce}
                        loadingText="Updating..."
                        type="submit"
                        marginLeft="5px"
                        colorScheme="blue"
                        mr={3}
                      >
                        Update
                      </Button>
                    </Form>
                  </Formik>
                </div>
              </div>
              <ModalFooter>
                <Button type="button" onClick={onClose} variant="ghost">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    }
  }
  // MAIN COMPONENT ==========================================
  return (
    <TableContainer
      overflowX="auto"
      overflowY="hidden"
      display="block"
      whiteSpace="nowrap"
      className="chakra-table-container"
    >
      <ItemModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        showItem={showItem}
      />

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
            <Tr
              className="tbody-tr"
              key={item._id}
              onClick={() => handleModal(item)}
            >
              <Td className="tbody-tr--td">
                <img
                  className="tbody-tr--image"
                  src={item.gallon_image}
                  alt=""
                />
              </Td>
              <Td>{item.name}</Td>
              <Td isNumeric className={item?.borrowed < 0 ? "warning" : "good"}>
                {item.borrowed}
              </Td>
              <Td
                isNumeric
                className={item?.available < 0 ? "warning" : "neutral"}
              >
                {item.available}
              </Td>
              <Td isNumeric className={item?.total < 0 ? "warning" : "neutral"}>
                {item.total}
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

export default AdminInventoryGallon;
