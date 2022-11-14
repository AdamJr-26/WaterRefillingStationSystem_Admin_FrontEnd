import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminCreditNewTransaction from "../components/AdminCreditNewTransaction";
import AdminDataGrid from "../components/AdminDataGrid";
import AdminDataGridButton from "../components/AdminDataGridButton";
import { onGoingDeliveries } from "../lib/sample/data";
let ongoingDeliveriesColumn = [];
function extractRow() {
  for (let field in onGoingDeliveries[0]) {
    ongoingDeliveriesColumn.push({
      field: field,
      headerName: field.toUpperCase(),
      width: 170,
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
    },flex: 1, minWidth: 150
    
  });
}
extractRow();

function AppDelivery() {
  return (
    <div className="admin-delivery">
      <p>Request Deliveries</p>
      <ScrollContainer className="scroll-container">
        <div className="scroll-wrapper">
          {[1, 2, 3].map((num, i) => (
            <div className="scroll-wrapper--request" key={i}>
              <div className="scroll-wrapper--request__delivery-personel">
                <img src="https://picsum.photos/200" alt="" srcSet="" />
                <div className="delivery-name">
                  <span className="person">Juan Dela Cruz</span>
                  <span className="vehicle">Tricycle 356</span>
                </div>
              </div>
              <table className="scroll-wrapper--request__load">
                <tbody>
                  <tr>
                    <td>US-Gallon</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>US-Gallon</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>50</td>
                  </tr>
                </tbody>
              </table>
              <div className="scroll-wrapper--request__buttons">
                <button className="deny">Deny</button>
                <button className="accept">Accept</button>
              </div>
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className="admin-delivery--ongoing-deliveries">
        <div className="admin-delivery--ongoing-deliveries__header">
          <span>Ongoing Deliveries</span>
        </div>
        <AdminDataGrid
          TableRows={onGoingDeliveries}
          TableColumns={ongoingDeliveriesColumn}
        />
      </div>
    </div>
  );
}

export default AppDelivery;
