import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { apiGet } from "../../../services/api/axios.methods";
function DeliveryRoutesModal({ delivery }) {
  const [deliveryRoutes, setDeliveryRoutes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    async function getDeliveryRoutes() {
      if (!delivery && !isOpen) return;
      const { data, error } = await apiGet(
        `/api/delivery/show-routes/${delivery}`
      );
      console.log("<>>>>>>>>>>><<<<<<<<>>", data);
      if (data && !error) {
        setDeliveryRoutes(data.data[0]);
      }
    }
    getDeliveryRoutes();
  }, [isOpen]);
  return (
    <>
      <button onClick={onOpen}>
        <Icon icon="tabler:route" /> Routes
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delivery Routes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {deliveryRoutes?.assignedSchedules?.map((sched, i) => (
              <div key={i} className="delivery-routes-details-modal">
                <div className="delivery-routes-details-modal--customer">
                  <div className="delivery-routes-details-modal--customer__name">
                    <p>{sched.customer.fullName}</p>
                    
                  </div>
                </div>
                <div className="delivery-routes-details-modal--address">
                  <p>Address</p>
                  <p>{sched.customer.fullAddress}</p>
                </div>
                <div className="delivery-routes-details-modal--orders-wrapper">
                  <p className="delivery-routes-details-modal--orders-wrapper__title">
                    Orders
                  </p>
                  {sched.items.map((item, j) => (
                    <div
                      key={j}
                      className="delivery-routes-details-modal--orders-wrapper__gallons"
                    >
                      <p>{item.name}</p>
                      <p>{item.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeliveryRoutesModal;
