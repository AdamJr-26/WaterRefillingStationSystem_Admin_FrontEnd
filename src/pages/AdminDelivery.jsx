import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminCreditNewTransaction from "../components/AdminCreditNewTransaction";
import AdminDataGrid from "../components/AdminDataGrid";
import AdminDataGridButton from "../components/AdminDataGridButton";
import { onGoingDeliveries } from "../lib/sample/data";
import useFetch from "../hooks/api/useFetch";
import DeliveryRequest from "../components/delivery/DeliveryRequest";
import AdminDeliveryDataTableOngoing from "../components/delivery/AdminDeliveryDataTableOngoing";

let ongoingDeliveriesColumn = [];
function extractRow() {
  for (let field in onGoingDeliveries[0]) {
    ongoingDeliveriesColumn.push({
      field: field,
      headerName: field.toUpperCase(),
      widthead: 170,
    });
  }
  ongoingDeliveriesColumn.push({
    field: "Cancel",
    renderCell: (cellValues) => {
      const handleClick = (e, cellValues) => {
        e.stopPropagation();
      };
      return (
        <button
          onClick={(e) => handleClick(e, cellValues)}
          type="button"
          className="admin-dataGrid-button-danger"
        >
          Cancel
        </button>
        // <AdminDataGridButton
        //   onClick={(e) => handleClick(e, cellValues)}
        //   label="Cancel"
        //   variant="warning"
        // />
      );
    },
    flex: 1,
    minWidthead: 150,
  });
}
extractRow();

function AppDelivery() {
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
          <p className="table-ongoing-delivery--header__title">Ongoing Deliveries</p>
          <p className="table-ongoing-delivery--header__description">
            Tracks your ongoing deliveries
          </p>
        </div>
        <AdminDeliveryDataTableOngoing data= {[]} />
      </div>
    </div>
  );
}

export default AppDelivery;
