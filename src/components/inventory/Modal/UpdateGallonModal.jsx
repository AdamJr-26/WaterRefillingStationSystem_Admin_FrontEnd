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
import useGallon from "../../../hooks/api/useGallon";
import { Icon } from "@iconify/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../general/TextInput";
import useSWR, { useSWRConfig } from "swr";
// API
import { updateGallon } from "../../../services/api/inventory/inventory.post";

function UpdateGallonModal({ isOpen, onOpen, onClose, showItem, toast }) {
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
    const [isUpdatingConPrice, setIsUpdatingConPrice] = useState(false)

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
    const updateContainerPrice = {
      initialValues: {
        containerPrice: "",
      },
      validationSchema: Yup.object().shape({
        containerPrice: Yup.number()
          .max(1000, "Container price must not exceed 1000.")
          .required("Container price is required."),
      }),
      onSubmit: async (values, { resetForm }) => {
        setIsUpdatingConPrice(true);
        const { updatedGallon, error } = await updateGallon({
          url: `/api/gallon/container-price/${data?._id}/${data?.admin}`,
          payload: values,
        });
        resetForm({ values: "" });
        responseHandler(updatedGallon, error);
        setIsUpdatingConPrice(false);
      },
    };
    const responseHandler = (data, error) => {
      console.log("dataaaa", data);
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
                    <p>Refill Price</p>
                    <p>₱ {data?.price}</p>
                  </div>
                  <div className="grallon-total-tag">
                    <p>Quantity</p>
                    <p>{data?.total}</p>
                  </div>
                </div>
              </div>
              <div className="update-inventory-gallon-modal--update">
                <div className="update-inventory-gallon-modal--update__note">
                  <Icon icon="mdi:warning-octagon-outline" color="red" />
                  <p>
                    Note: Changing price can affect different in different ways.
                  </p>
                </div>
                <Formik {...updatePrice}>
                  <Form className="update-inventory-gallon-modal--update__update-gallon-inputs">
                    <TextInput
                      label="Refill Price"
                      name="price"
                      placeholder="0"
                      type="number"
                    />
                    <Button
                      isLoading={isUpdatingPrice}
                      loadingText=""
                      type="submit"
                      marginLeft="5px"
                      colorScheme="blue"
                      mr={3}
                    >
                      Update
                    </Button>
                  </Form>
                </Formik>
                <Formik {...updateContainerPrice}>
                  <Form className="update-inventory-gallon-modal--update__update-gallon-inputs">
                    <TextInput
                      label="Container Price"
                      name="containerPrice"
                      placeholder="0"
                      type="number"
                    />
                    <Button
                      isLoading={isUpdatingConPrice}
                      loadingText=""
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
                      label="Add Quantity"
                      name="add_count"
                      placeholder="0"
                      type="number"
                    />
                    <Button
                      isLoading={isUpdatingAdd}
                      loadingText=""
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
                      label="Reduce Quantity"
                      name="reduce_count"
                      placeholder="0"
                      type="number"
                    />
                    <Button
                      isLoading={isUpdatingReduce}
                      loadingText=""
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
export default UpdateGallonModal;
