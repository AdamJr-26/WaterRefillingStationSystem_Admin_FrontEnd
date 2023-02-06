import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/api/useFetch";
import { apiGet, apiPut } from "../../../services/api/axios.methods";
import { Formik, Field, Form } from "formik";
import AdminTextinput from "../AdminTextinput";
import { useOutletContext } from "react-router-dom";

function ReturnBorrowedGallonModal({
  isOpen,
  onOpen,
  onClose,
  borrow,
  get_borrowed,
}) {
  const [gallonToReturn, setGallonToReturn] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setGallonToReturn(borrow?.total);
  }, [borrow]);

    
  async function handleReturnGallon() {
    if (isSubmitting || !gallonToReturn) return;
    setIsSubmitting(true);
    const { data, error } = await apiPut({
      url: `/api/borrow/return/${borrow?._id}/${borrow?.gallon?._id}`,
      payload: {
        gallonToReturn,
      },
    });
    if (data && !error) {
        onClose()
    //   ToastAndroid.show("Return gallon successfully", ToastAndroid.LONG);
      get_borrowed();
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      get_borrowed();
    //   ToastAndroid.show(
    //     "Return gallon failed, please try again.",
    //     ToastAndroid.LONG
    //   );
    }
  }
  return (
    <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Return Credit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="paycredits-modal">
            <div className="paycredits-modal--customer__credit">
              <div className="paycredits-modal-customer-credit-pay-credit-inputs">
                <AdminTextinput
                  label="Return gallon"
                  type="number"
                  inputValue={gallonToReturn}
                  setValue={setGallonToReturn}
                  name="total-gallon-to-return"
                />
              </div>
              <Button
                isLoading={isSubmitting}
                loadingText="Submitting..."
                onClick={handleReturnGallon}
                colorScheme="blue"
                mr={3}
                
              >
                Submit
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReturnBorrowedGallonModal;
