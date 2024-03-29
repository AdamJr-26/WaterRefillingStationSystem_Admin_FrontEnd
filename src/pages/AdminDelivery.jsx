import React, { useState, useEffect } from "react";
// import ScrollContainer from "react-indiana-drag-scroll";
// import AdminCreditNewTransaction from "../components/AdminCreditNewTransaction";
// import AdminDataGrid from "../components/AdminDataGrid";
// import AdminDataGridButton from "../components/AdminDataGridButton";
import { onGoingDeliveries } from "../lib/sample/data";
import useFetch from "../hooks/api/useFetch";
import DeliveryRequest from "../components/delivery/DeliveryRequest";
import AdminDeliveryDataTable from "../components/delivery/AdminDeliveryDataTable";
import { Icon } from "@iconify/react";
import FinishedDeliveryWrapper from "../components/delivery/component.wrapper/FinishedDeliveryWrapper";
import DeliveryTableWrapper from "../components/delivery/DeliveryTableWrapper";

function AppDelivery() {
  // const {
  //   data: ongoing_deliveries,
  //   error: deliveries_error,
  //   mutate: mutateOngoingDeliveries,
  //   isValidating: isValidatingOD,
  // } = useFetch({
  //   url: "/api/deliveries/ongoing",
  // });
  return (
    <div className="admin-delivery">
      <div className="delivery-request-wrapper">
        <div className="delivery-request-wrapper--header">
          <div>
            <p className="delivery-request-wrapper--header__title">
              Delivery request(s)
            </p>
            <p className="delivery-request-wrapper--header__description">
              Deliveries need your approval.
            </p>
          </div>
        </div>
        {/* the style of this shit is embedded from this parent module */}
        <DeliveryRequest />
      </div>

      {/* ongling deliveries */}
      <div className="delivery-data-table">
        <div className="delivery-data-table--header">
          <div>
            <p className="delivery-data-table--header__title">Deliveries</p>
            <p className="delivery-data-table--header__description">
              Tracks the ongoing and finished deliveries
            </p>
          </div>
        </div>
        <DeliveryTableWrapper />
        {/* <AdminDeliveryDataTable
          data={ongoing_deliveries}
          error={deliveries_error}
          isValidating={isValidatingOD}
        /> */}
      </div>
      {/* <FinishedDeliveryWrapper /> */}
    </div>
  );
}

export default AppDelivery;
