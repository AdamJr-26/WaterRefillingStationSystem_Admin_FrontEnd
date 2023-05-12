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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { apiGet } from "../../../services/api/axios.methods";
function DeliveryProgressModal({ isOpen, onOpen, onClose, deliveryId }) {
  const [deliveryProgress, setDeliveryProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getDeliveryProgress() {
      console.log("isOpen", isOpen);
      if (!isOpen) return;
      setIsLoading(true);
      const { data, error } = await apiGet(
        `/api/delivery/progress/${deliveryId}`
      );
      setIsLoading(false);
      if (data && !error) {
        console.log("data<<<<@@@@@@@@@@@@", data);
        setDeliveryProgress(data.data[0]);
      }
      console.log("datadatadata", data.data[0]);
    }
    getDeliveryProgress();
  }, [isOpen]);
  console.log("deliveryProgress<<<<@@@@@@@@@@@@", deliveryProgress);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        {deliveryProgress && !isLoading ? (
          <TableContainer minHeight="250px">
            <Box padding={4} display="flex" gap="10px">
              <Text>Dispatched date</Text>
              <Text fontWeight="bold">
                {format(
                  new Date(deliveryProgress?.dispatched_date),
                  "MMM-dd-yyyy"
                )}
              </Text>
            </Box>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Gallon</Th>
                  <Th>Dispatched quantity</Th>
                  <Th>Delivered</Th>
                </Tr>
              </Thead>
              <Tbody>
                {deliveryProgress?.dispatched_items?.map((item, i) => (
                  <Tr key={i}>
                    <Td>{item.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.soldGallon}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                {/* <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr> */}
              </Tfoot>
            </Table>
          </TableContainer>
        ) : (
          <Skeleton height="250px">
            <div></div>
            <div></div>
          </Skeleton>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeliveryProgressModal;
