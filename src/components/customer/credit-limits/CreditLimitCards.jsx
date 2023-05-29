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
import useFetch from "../../../hooks/api/useFetch";
import ListSkeletonLoading from "../../general/ListSkeletonLoading";
import AdminAlertDialog from "../../general/AdminAlertDialog";
import { apiDelete } from "../../../services/api/axios.methods";
import { format } from "date-fns";

function CreditLimitCards() {
  const toast = useToast();

  const {
    data: creditLimits,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useFetch({
    url: "/api/credit-limit",
  });
  
  console.log("creditLimits", creditLimits);
  const deleteDialog = useDisclosure();

  async function handleDelete({ item }) {
    const { data, error } = await apiDelete({
      url: `/api/credit-limit/${item?._id}`,
    });

    deleteDialog.onClose();
    if (data && !error) {
      mutate();
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="green" borderRadius="10">
            The credit limit have been successfully deleted.
          </Box>
        ),
      });
    } else {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="red" borderRadius="10">
            Credit limit cannot be deleted at this moment
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
        creditLimits?.data?.map((creditLimit, i) => (
          <div key={i} className="discounts-wrapper--card">
            <div className="discounts-wrapper--card__discount-type">
              {/* <p>Discount type</p> */}
              <p>Credit limit: ₱ {creditLimit.creditLimit}</p>
            </div>
            <div className="discounts-wrapper--card__description">
              {/* <p>Description</p> */}
              <p>
                The customer must pay {creditLimit.creditTermByDays} days after
                the credit renewal
              </p>
            </div>
            <div className="discounts-wrapper--card__buttons">
              <AdminAlertDialog
                isOpen={deleteDialog.isOpen}
                onOpen={deleteDialog.onOpen}
                onClose={deleteDialog.onClose}
                submit={handleDelete}
                item={creditLimit} // ipapasa na item na gagawan ng action.
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CreditLimitCards;
