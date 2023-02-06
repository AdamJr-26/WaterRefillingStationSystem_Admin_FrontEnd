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

function PayCreditsModal({
  isOpen,
  onOpen,
  onClose,
  credit,
  mutatePagination,
}) {
  const finalRef = React.useRef(null);
  //   fetch a credit with gallons details.
  const [creditInfo, setCreditInfo] = useState(null);
  console.log("credit, credit", credit);
  useEffect(() => {
    async function getCreditInfo() {
      if (!isOpen) return;
      const { data, error } = await apiGet(
        `/api/credit/info/${credit?._id}/${credit?.customer}`
      );
      if (data && !error) {
        setCreditInfo(data.data[0]);
      } else {
        setCreditInfo(null);
      }
    }
    getCreditInfo();
  }, [credit]);
  console.log("creditInfo", creditInfo);

  //   form
  const [totalGallonToPay, setTotalGallonToPay] = useState(0);
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  useEffect(() => {
    setTotalGallonToPay(credit?.total);
    setTotalAmountToPay(credit?.price * credit?.total);
  }, [credit]);

  //   handle submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (isSubmitting || !totalGallonToPay || !totalAmountToPay) return;
    console.log("isSubmitting", isSubmitting);
    setIsSubmitting(true);
    const { data, error } = await apiPut({
      url: `/api/credits/pay/${credit?._id}`,
      payload: {
        totalGallonToPay,
        totalAmountToPay,
        gallon_id: creditInfo?.gallon[0]?._id
      },
    });
    if (data && !error) {
      setIsSubmitting(false);
      mutatePagination();
      onClose();
      if (useOutletContext().mutateReceivable !== undefined) {
        const { mutateReceivable } = useOutletContext();
        mutateReceivable();
      }
    } else {
      setIsSubmitting(false);
    }
  };
  //   on change text in total credited gallon.
  function onChangeTotalCreditGallon(value) {
    setTotalGallonToPay(value);
    setTotalAmountToPay(value * credit?.price);
  }
  useEffect(() => {
    onChangeTotalCreditGallon(totalGallonToPay);
  }, [totalGallonToPay]);

  return (
    <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Credit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="paycredits-modal">
              <div className="paycredits-modal--customer">
                <div className="paycredits-modal--customer__display-photo">
                  <img
                    src={credit?.customer[0]?.display_photo}
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="paycredits-modal--customer__info">
                  <p className="name">
                    {creditInfo?.customer[0]?.firstname || ""}{" "}
                    {creditInfo?.customer[0]?.lastname || ""}
                  </p>
                  <p className="address">
                    {creditInfo?.customer[0]?.address?.street}
                    {", "}
                    {creditInfo?.customer[0]?.address?.barangay}
                    {", "}
                    {creditInfo?.customer[0]?.address?.municipal_city}
                    {", "}
                    {creditInfo?.customer[0]?.address?.province}
                  </p>
                </div>
              </div>
              <div className="paycredits-modal--customer__credit">
                <div className="paycredits-modal-customer-credit-gallon-info">
                  <div className="paycredits-modal-customer-credit-gallon-info--gallon-image-wrapper">
                    <img
                      src={creditInfo?.gallon[0]?.gallon_image}
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="paycredits-modal-customer-credit-gallon-info--texts">
                    <p>{creditInfo?.gallon[0]?.name}</p>
                    <p>{creditInfo?.gallon[0]?.liter} Liter(s)</p>
                  </div>
                </div>
                <div className="paycredits-modal-customer-credit-pay-credit-inputs">
                  <AdminTextinput
                    label="Total gallon to pay"
                    type="number"
                    inputValue={totalGallonToPay}
                    setValue={setTotalGallonToPay}
                    name="total-gallon-to-pay"
                  />
                  <AdminTextinput
                    label="Total amount to pay"
                    type="number"
                    inputValue={totalAmountToPay}
                    setValue={setTotalAmountToPay}
                    name="total-amount-to-pay"
                  />
                </div>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                  onClick={handleSubmit}
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
    </div>
  );
}

export default PayCreditsModal;
