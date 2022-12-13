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
} from "@chakra-ui/react";

function MarkLocation({ isOpen, onOpen, onClose, geolocation }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Location</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            <div className="mark-location">
              <div className="hmark-location--header">
                <p>Mark your location*</p>
                <p>
                  By marking your location you are helping the customers to
                  easily find your Water Refilling Station
                </p>
                <p>Step 1: Click the map to find your location</p>
                <p>Step 2: Drag the marker to manually set position</p>
              </div>
            </div>
            <Map formData={geolocation} />
          </>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MarkLocation;
0;
