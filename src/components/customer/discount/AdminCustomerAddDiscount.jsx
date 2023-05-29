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

function AdminCustomerAddDiscount() {
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
        Add promo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Promo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Get free</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Formik
                    initialValues={{
                      buy: "",
                      get: "",
                      validityPeriod: "",
                    }}
                    validationSchema={Yup.object().shape({
                      buy: Yup.number().required("Buy is required"),
                      get: Yup.number().required("Get is required"),
                      validityPeriod: Yup.date(),
                    })}
                    onSubmit={async (values, { resetForm }) => {
                      const { data, error } = await createDiscount({
                        url: "/api/discount/get-free",
                        payload: values,
                      });
                      if (data && !error) {
                        resetForm();
                        toast({
                          title: "Discount created",
                          description: "Just created a discount",
                          status: "success",
                          duration: 6000,
                          isClosable: true,
                        });
                        console.log("[CREATE DISCOUNT DATA]", data);
                      } else {
                        toast({
                          title: "Failed ",
                          description: "Failed to create discount",
                          status: "error",
                          duration: 6000,
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    <Form>
                      <div className="customer-create-discount">
                        <p className="customer-create-discount--discription">
                          Get free by the total of customer's order or purchase.
                        </p>
                        <div className="customer-create-discount--form">
                          <TextInput
                            label="Total of purchase"
                            name="buy"
                            type="number"
                            placeholder="0"
                          />
                          <TextInput
                            label="Free"
                            name="get"
                            type="number"
                            placeholder="0"
                          />
                          <TextInput
                            label="Validity period"
                            name="validityPeriod"
                            type="date"
                          />
                          <TextInput
                            label="Type"
                            name="isAccumulated"
                            type="text"
                            placeholder="non-accumulated"
                            disabled={true}
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
                </TabPanel>
              </TabPanels>
            </Tabs>
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

export default AdminCustomerAddDiscount;
