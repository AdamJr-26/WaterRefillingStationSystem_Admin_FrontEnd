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
  Text,
  Container,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../general/TextInput";
import React, { useState, useEffect } from "react";
import { applyNewPersonel } from "../../services/api/employees/employee.post";

function AdminEmployeesNewPersonnelModal({ isOpen, onOpen, onClose }) {
  const [isSending, setIsSending] = useState(false);
  const [applyID, setApplyID] = useState(false);
  const [expiry, setExpiry] = useState(10);
  const toast = useToast();

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Delivery Personnel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ gmail: "" }}
              validationSchema={Yup.object().shape({
                gmail: Yup.string().email().required("Email is required"),
              })}
              onSubmit={async (values) => {
                const payload = values;
                const url = "/api/employee/personel/apply-id";
                const { personelApplyData, error } = await applyNewPersonel({
                  payload,
                  url,
                });
                if (personelApplyData && !error) {
                  const data = personelApplyData?.data?.otp;
                  setApplyID(data);
                  toast({
                    title: "Apply ID created.",
                    description: "Success",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Failed.",
                    description: error?.apply_new_personel_admin.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  console.log("errr", error?.apply_new_personel_admin.message);
                }
                values.gmail = "";
              }}
            >
              <Form>
                <div>
                  <TextInput
                    label="Email"
                    name="gmail"
                    type="text"
                    placeholder="sample@gmail.com"
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={isSending}
                  loadingText="Please Wait"
                  backgroundColor="#2389DA"
                  color="white"
                  variant="solid"
                >
                  Get ID
                </Button>
              </Form>
            </Formik>
            {applyID ? (
              <Container
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={5}
              >
                <Text
                  fontSize={16}
                  textAlign="center"
                  fontWeight={500}
                  color="gray.800"
                >
                  Apply ID
                </Text>
                <Text
                  fontSize={32}
                  textAlign="center"
                  fontWeight={700}
                  color="gray.500"
                >
                  {applyID?.token}
                </Text>
                <Text
                  fontSize={14}
                  textAlign="center"
                  fontWeight={500}
                  color="gray.800"
                >
                  {applyID?.gmail} apply ID is now ready. expires in 3 minutes.
                </Text>
              </Container>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} color="#2D3748">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminEmployeesNewPersonnelModal;
