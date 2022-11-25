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
        <div className="delivery-request-wrapper--cards">
          {[1, 2, 3].map((item) => (
            <div key={item} className="delivery-request-wrapper--cards__card">
              <div className="delivery-card-info">
                <table className="delivery-card-info--delivery-item-table">
                  <tbody>
                    <tr>
                      <th>Gallon Name</th>
                      <th>Count</th>
                    </tr>
                    <tr>
                      <td>Imperial Gallon</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>Faucet Gallon</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Imperial Gallon</td>
                      <td>25</td>
                    </tr>
                  </tbody>
                </table>
                <div className="delivery-card-info--personel-info">
                  <img
                    src="https://cdn.motor1.com/images/mgl/nOlNy/s1/1x1/elon-musk.webp"
                    alt="personel"
                    className="delivery-card-info--personel-info__image"
                  />
                  <p className="delivery-card-info--personel-info__name">
                    Juan Dela Cruz
                  </p>
                  <div className="delivery-card-info--personel-info__total">
                    <p>Total</p>
                    <p>60 Items</p>
                  </div>
                </div>
              </div>

              <div className="delivery-card-buttons">
                <div className="delivery-card-buttons--vehicle-id">
                  <p>Vehicle ID</p>
                  <p>66D58S4</p>
                </div>
                <div className="delivery-card-buttons--button">
                  <button>Reject</button>
                  <button>Accept</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppDelivery;
