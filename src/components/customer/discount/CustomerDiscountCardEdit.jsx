import React from "react";
import { Icon } from "@iconify/react";
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
} from "@chakra-ui/react";

function CustomerDiscountCardEdit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button
        backgroundColor="#2389DA"
        borderRadius="15px"
        height="45px"
        color="white"
        onClick={onOpen}
      >
        Add Discount
      </Button> */}
      <button onClick={onOpen}>Edit</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomerDiscountCardEdit;
