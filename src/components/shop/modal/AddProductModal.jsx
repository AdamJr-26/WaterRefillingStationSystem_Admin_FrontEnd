import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../../services/api/axios.methods";

function AddProductModal() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // fetch all gallons
  const [gallons, setGallons] = useState([]);
  useEffect(() => {
    async function getAllGallonNotInProducts() {
      if (!isOpen) return;
      try {
        const { data, error } = await apiGet("/api/gallons/not-in-products");
        if (data && !error) {
          setGallons(data.data);
        }
      } catch (error) {
        console.log("errr", error);
      }
    }
    getAllGallonNotInProducts();
  }, [isOpen]);
  async function handleGallonClick(gallon) {
    const { data, error } = await apiPost({
      url: "/api/product",
      payload: {
        gallon: gallon._id,
        price: gallon.price,
      },
    });
    if (data && !error) {
      toast({
        title: "Success",
        description: "A Gallon has been placed.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      console.log("datadata", data);
    }
  }
  return (
    <>
      <Tooltip label="Place product">
        <button onClick={onOpen}>
          <Icon icon="material-symbols:add" />
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="shop-add-product-modal-body">
              <div className="shop-add-product-modal-body--header">
                <p>Place Gallon</p>
              </div>
              <div className="shop-add-product-modal-body--gallon-list">
                {gallons.length ? (
                  gallons?.map((gallon, i) => (
                    <div
                      onClick={() => handleGallonClick(gallon)}
                      key={i}
                      className="shop-add-product-modal-body--gallon-list__item"
                    >
                      <div className="gallon-list-item-image-wrapper">
                        <img src={gallon.gallon_image} alt="" />
                      </div>
                      <div className="gallon-list-item-description">
                        <p className="gallon-list-item-description--name">
                          {gallon.name}
                        </p>
                        <p className="gallon-list-item-description--volume">
                          {gallon.liter} Liter(s)
                        </p>
                        <p className="gallon-list-item-description--price">
                          ₱ {gallon.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="shop-add-product-modal-body--gallon-list__not-item">
                    <p>All of the gallons have been placed in the shop.</p>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddProductModal;
