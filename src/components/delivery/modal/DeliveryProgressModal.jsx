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
  Container,
  useToast,
  Stack,
  Text,
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { apiGet } from "../../../services/api/axios.methods";
function DeliveryProgressModal({ isOpen, onOpen, onClose, deliveryId }) {
  const [deliveryProgress, setDeliveryProgress] = useState(null);
  useEffect(() => {
    async function getDeliveryProgress() {
      console.log("isOpen", isOpen);
      if (!isOpen) return;
      const { data, error } = await apiGet(
        `/api/delivery/summary/${deliveryId}`
      );
      if (data && !error) {
        setDeliveryProgress(data.data[0]);
      }
      console.log("datadatadata", data.data[0]);
    }
    getDeliveryProgress();
  }, [isOpen]);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delivery Progress</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="100%" p={1}>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              backgroundColor="#f4f4f4"
              padding={2}
            >
              <Text>Borrowed gallon(s)</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_borrowed_gallon}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              padding={2}
            >
              <Text>Credited gallon(s)</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_credited_gallon}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              backgroundColor="#f4f4f4"
              padding={2}
            >
              <Text>Free gallon(s)</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_free}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              padding={2}
            >
              <Text>Received debt's payment</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_of_all_debt_payment}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              backgroundColor="#f4f4f4"
              padding={2}
            >
              <Text>Total Borrowed Gallon</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_of_all_order_to_pay}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              padding={2}
            >
              <Text>Total Borrowed Gallon</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_of_all_payment}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              backgroundColor="#f4f4f4"
              padding={2}
            >
              <Text>Total Borrowed Gallon</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_orders}
              </Text>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginTop="8px"
              borderRadius="5px"
              padding={2}
            >
              <Text>Total Borrowed Gallon</Text>
              <Text fontSize="xl" fontWeight="bold">
                {deliveryProgress?.total_returned_gallon}
              </Text>
            </Flex>
          </Box>
          {/* <div>
            <div>
              <p>Total Borrowed Gallon</p>
              <p>{deliveryProgress?.total_borrowed_gallon}</p>
            </div>
          </div> */}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color="#2D3748">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeliveryProgressModal;
