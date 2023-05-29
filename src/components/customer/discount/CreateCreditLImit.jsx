import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import TextInput from "../../general/TextInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createDiscount } from "../../../services/api/discount/create.discount";
import DateTime from "../../general/DateTime";
import SelectDate from "../../general/SelectDate";
import TextInputSelect from "../../general/TextInputSelect";
import { apiPost } from "../../../services/api/axios.methods";

function CreateCreditLImit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button
        backgroundColor="#2389DA"
        borderRadius="15px"
        height="45px"
        color="white"
        onClick={onOpen}
      >
        Credit limit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credit limit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                // customerType: "",
                creditLimit: "",
                creditTermByDays: "",
              }}
              validationSchema={Yup.object().shape({
                // customerType: Yup.number().required(
                //   "Customer type is required"
                // ),
                creditLimit: Yup.number().required("Credit limit is required"),
                creditTermByDays: Yup.number(),
              })}
              onSubmit={async (values, { resetForm }) => {
                console.log("values<<<<<<<<", values);
                const { data, error } = await apiPost({
                  url: "/api/credit-limit",
                  payload: values,
                });
                if (data && !error) {
                  resetForm();
                  toast({
                    title: "Credit limit",
                    description: "Just created a credit limit",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                  });
                  console.log("[CREATE CREDIT LIMIT DATA]", data);
                } else {
                  toast({
                    title: "Failed ",
                    description: "Failed to create credit limit",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                  });
                }
              }}
            >
              <Form>
                <div className="customer-create-discount">
                  {/* <p className="customer-create-discount--discription">
                    Create credit limit for customer type.
                  </p> */}
                  <div className="customer-create-discount--form">
                    {/* <TextInputSelect
                      label="Select customer type"
                      name="customerType"
                      selectValues={[
                        {
                          label: "Regular",
                          value: "regular",
                        },
                      ]}
                    /> */}
                    <TextInput
                      label="Credit limit ₱"
                      name="creditLimit"
                      type="number"
                      placeholder="0"
                    />
                    <TextInput
                      label="Credit term by day(s)"
                      name="creditTermByDays"
                      type="number"
                      placeholder="0"
                    />

                    {/* <Stack>
                            <Text>Accumulated</Text>
                            <Select placeholder="large size" size="lg" />
                          </Stack> */}

                    <Button
                      marginTop={4}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </ModalBody>

          <ModalFooter>
            {/* <Button mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCreditLImit;
