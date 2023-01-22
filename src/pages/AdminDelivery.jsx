import React, { useState } from "react";
// import ScrollContainer from "react-indiana-drag-scroll";
// import AdminCreditNewTransaction from "../components/AdminCreditNewTransaction";
// import AdminDataGrid from "../components/AdminDataGrid";
// import AdminDataGridButton from "../components/AdminDataGridButton";
import { onGoingDeliveries } from "../lib/sample/data";
import useFetch from "../hooks/api/useFetch";
import DeliveryRequest from "../components/delivery/DeliveryRequest";
import AdminDeliveryDataTableOngoing from "../components/delivery/AdminDeliveryDataTableOngoing";

function AppDelivery() {
  const {
    data: ongoing_deliveries,
    error: deliveries_error,
    mutate: mutateOngoingDeliveries,
    isValidating,
  } = useFetch({
    url: "/api/deliveries/ongoing",
  });
  // console.log("ongoing_deliveries", ongoing_deliveries);

  // fetch finished deliveries by date.
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const {
    data: finishedDeliveries,
    error: finishedDeliveriesError,
    mutate: mutateFinishedDeliveries,
    isValidating: isValidatingFD,
  } = useFetch({ url: `/api/deliveries/finished/${fromDate}/${toDate}` });
  console.log("finishedDeliveries", finishedDeliveries);
  return (
    <div className="admin-delivery">
      <div className="delivery-request-wrapper">
        <div className="delivery-request-wrapper--header">
          <p className="delivery-request-wrapper--header__title">
            Request Delivery
          </p>
        </div>
        {/* the style of this shit is embedded from this parent module */}
        <DeliveryRequest />
      </div>

      {/* ongling deliveries */}
      <div className="table-ongoing-delivery">
        <div className="table-ongoing-delivery--header">
          <p className="table-ongoing-delivery--header__title">
            Ongoing Deliveries
          </p>
          <p className="table-ongoing-delivery--header__description">
            Tracks your ongoing deliveries
          </p>
        </div>
        <AdminDeliveryDataTableOngoing
          data={ongoing_deliveries}
          error={deliveries_error}
        />
      </div>

      <div className="table-ongoing-delivery">
        <div className="table-ongoing-delivery--header">
          <p className="table-ongoing-delivery--header__title">
            Finished Deliveries
          </p>
          <p className="table-ongoing-delivery--header__description">
            Tracks the finished deliveries
          </p>
        </div>
        <AdminDeliveryDataTableOngoing
          data={finishedDeliveries}
          error={finishedDeliveriesError}
        />
      </div>
    </div>
  );
}

export default AppDelivery;
