import React, { useState } from "react";
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
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import TextInputPassword from "../TextInputPassword";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosAPI from "../../services/axios";
import { useAuth } from "../../hooks/auth";
import { Icon } from "@iconify/react";

function AdminResetPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const warning = useDisclosure();
  const cancelRef = React.useRef();
  const { userProfile } = useAuth();
  const [isLoadingButton, setIsloadingButton] = useState(false);
  const user = userProfile?.data;
  const onSubmitReset = (values) => {
    if (
      values.current_password &&
      values.new_password &&
      values.confirm_new_password &&
      user?.gmail
    ) {
      setIsloadingButton(true); //set loading button to true.
      axiosAPI()({
        url: "/auth/update-admin-password",
        method: "post",
        withCredentials: true,
        data: { ...values, gmail: user?.gmail },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setIsloadingButton(false); // set loading button to false
            onClose();
            toast({
              title: "Password Updated",
              description: "You have updated your pasword",
              status: "success",
              duration: "4000",
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setIsloadingButton(false);
          const message =
            err.response?.data?.errors?.update_password_admin?.message;
          toast({
            title: message,
            description: "Please double check your input",
            status: "error",
            duration: "4000",
            isClosable: true,
          });
        });
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        variant="solid"
        color="blackAlpha.800"
        width="100%"
        background="#f3f4f6"
        type="button"
      >
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            current_password: "",
            new_password: "",
            confirm_new_password: "",
          }}
          validationSchema={Yup.object({
            current_password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .max(16, "Password must not exceed 16 letters")
              .required("Password is required"),
            new_password: Yup.string()
              .notOneOf(
                [Yup.ref("current_password"), null],
                "New Password should not be the same with your old password."
              )
              .min(6, "Password must be at least 6 characters")
              .max(16, "Password must not exceed 16 letters")
              .required("Password is required"),
            confirm_new_password: Yup.string()
              .notOneOf(
                [Yup.ref("current_password"), null],
                "New Password should not be the same with your old password."
              )
              .oneOf([Yup.ref("new_password"), null], "Password must match")
              .min(6, "Password must be at least 6 characters")
              .max(16, "Password must not exceed 16 letters")
              .required("Password is required"),
          })}
          onSubmit={onSubmitReset}
        >
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change Password</ModalHeader>
              <ModalCloseButton type="button" />
              <ModalBody>
                <div style={{ fontSize: "12px", display: "flex", gap: 5 }}>
                  <Icon icon="dashicons:warning" fontSize={16} color="gray" />{" "}
                  <span>
                    If you can't remember your password, logout then go to login
                    page and click forgot password.
                  </span>
                </div>
                <Stack direction={["column"]} spacing="24px">
                  <TextInputPassword
                    label="Current Password"
                    name="current_password"
                    placeholder="Current Password"
                  />
                  <Stack>
                    <TextInputPassword
                      label="New Password"
                      name="new_password"
                      placeholder="New Password"
                    />
                    <TextInputPassword
                      label="Confirm New Password"
                      name="confirm_new_password"
                      placeholder="Confirm New Password"
                    />
                  </Stack>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  isLoading={isLoadingButton}
                  loadingText="Please wait..."
                  variant="ghost"
                  color="#FF7046"
                  type="submit"
                >
                  Change Password
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default AdminResetPassword;
