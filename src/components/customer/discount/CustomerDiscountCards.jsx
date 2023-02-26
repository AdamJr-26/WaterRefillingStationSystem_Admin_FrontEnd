import React from "react";
import { Icon } from "@iconify/react";

import CustomerDiscountCardEdit from "./CustomerDiscountCardEdit";
import useFetch from "../../../hooks/api/useFetch";
import ListSkeletonLoading from "../../general/ListSkeletonLoading";

function CustomerDiscountCard() {
  const { data, error, isValidating } = useFetch({
    url: "/api/discounts/get-free",
  });
  console.log("[DATA]", data);
  console.log("[error]", error);
  return (
    <div className="discounts-wrapper">
      {isValidating ? (
        <ListSkeletonLoading num_lines={5} />
      ) : (
        data?.data?.map((discount, i) => (
          <div key={i} className="discounts-wrapper--card">
            <div className="discounts-wrapper--card__discount-type">
              <p>Discount type</p>
              <p>
                Buy {discount?.get_free.buy} get {discount?.get_free.get}{" "}
              </p>
            </div>
            <div className="discounts-wrapper--card__description">
              <p>Description</p>
              <p>
                For every {discount?.get_free.buy} gallons purchased, customer
                will receive {discount?.get_free.get} free gallon(s).
              </p>
            </div>
            <div className="discounts-wrapper--card__buttons">
              {/* <button>Edit</button> */}
              <CustomerDiscountCardEdit />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerDiscountCard;
