import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  AlertDialog,
  Button,
  ButtonGroup,
  Stack,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import CustomerDiscountCardEdit from "./CustomerDiscountCardEdit";
import useFetch from "../../../hooks/api/useFetch";
import ListSkeletonLoading from "../../general/ListSkeletonLoading";
import AdminAlertDialog from "../../general/AdminAlertDialog";
import { apiDelete } from "../../../services/api/axios.methods";

function CustomerDiscountCard() {
  const toast = useToast();

  const { data, error, isValidating, isLoading, mutate } = useFetch({
    url: "/api/discounts/get-free",
  });

  const deleteDialog = useDisclosure();

  async function handleDelete({ item }) {
    const { data, error } = await apiDelete({
      url: `/api/discount/${item?._id}`,
    });
    deleteDialog.onClose();
    if (data && !error) {
      mutate();
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="green" borderRadius="10">
            The promo have been successfully deleted.
          </Box>
        ),
      });
    } else {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="red" borderRadius="10">
            Promo cannot be deleted at this moment
          </Box>
        ),
      });
    }
  }

  return (
    <div className="discounts-wrapper">
      {isLoading ? (
        <ListSkeletonLoading num_lines={5} />
      ) : (
        data?.data?.map((discount, i) => (
          <div key={i} className="discounts-wrapper--card">
            <div className="discounts-wrapper--card__discount-type">
              {/* <p>Discount type</p> */}
              <p>
                Buy {discount?.get_free.buy} get {discount?.get_free.get}{" "}
              </p>
            </div>
            <div className="discounts-wrapper--card__description">
              {/* <p>Description</p> */}
              <p>
                For every {discount?.get_free.buy} gallons purchased, customer
                will receive {discount?.get_free.get} free gallon(s).
              </p>
            </div>
            <div className="discounts-wrapper--card__buttons">
              <AdminAlertDialog
                isOpen={deleteDialog.isOpen}
                onOpen={deleteDialog.onOpen}
                onClose={deleteDialog.onClose}
                submit={handleDelete}
                item={discount} // ipapasa na item na gagawan ng action.
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerDiscountCard;
