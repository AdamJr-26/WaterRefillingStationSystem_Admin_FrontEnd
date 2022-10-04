import React from "react";
import oneLiter from "../assets/images/gallons_transparent/icons/1L.png";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminTextinput from "../components/AdminTextinput";
import AdminInventoryAddGallon from "../components/AdminInventoryAddGallon";
import {
  addGallonState,
  updateGallonState,
} from "../lib/store/globalPopupSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminInventoryFloatingActionButton from "../components/AdminInventoryFloatingActionButton";
import AdminInventoryAddVehicle from "../components/AdminInventoryAddVehicle";
import AdminInventoryUpdateGallon from "../components/AdminInventoryUpdateGallon";
import AdminDataGrid from "../components/AdminDataGrid";

import { borrowers } from "../lib/sample/data";
const gallonBorrowerColumn = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "contact_number", headerName: "Contact Number", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "total_count", headerName: "Total", width: 150 },
];
function AppInventory() {
  const dispatch = useDispatch();
  const updateGallonModalState = useSelector(
    (state) => state.globalPopupSlice.updateGallonValue
  );

  return (
    <div className="inventory">
      <p>Gallons</p>
      <div className="reference">
        <div className="reference--borrowed-color">
          <span>Borrowed</span>
        </div>
        <div className="reference--available-color">
          {" "}
          <span>Available</span>
        </div>
        <div className="reference--total-color">
          <span>Total</span>{" "}
        </div>
      </div>
      <ScrollContainer className="scroll-container">
        <div className="gallons">
          {[1, 3, 4].map((item, i) => (
            <div
              className="gallons--gallon"
              key={i}
              onClick={() => dispatch(updateGallonState())}
            >
              <div className="gallons--gallon__details-wrapper">
                <img src={oneLiter} alt="gallon image" />
                <div className="detail">
                  <span className="name">Faucet</span>
                  <span className="size">1 Liter</span>
                  <span className="price">P 12</span>
                </div>
              </div>
              <div className="gallons--gallon__availability">
                <span className="borrowed"> 360</span>
                <span className="available"> 30</span>
                <span className="total"> 390</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollContainer>
      <p>Vehicles</p>
      <ScrollContainer className="scroll-container">
        <div className="vehicles">
          {[1, 3, 4].map((item, i) => (
            <div className="vehicles--vehicle" key={i}>
              <img src="https://picsum.photos/200" alt="" srcSet="" />
              <div className="vehicles--vehicle__details">
                <span className="name">Tricycle</span>
                <span className="plate-number">PN: 35615</span>
                <span className="availability">Available</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className="inventory--datagrids">
        <div className="inventory--datagrids__borrowed-gallons">
          <div className="header">
            <p>Gallon Borrowers</p>
            <select name="gallon-type" id="gallon-type">
              {["All","Imperial", "US-Gallon"].map((item, i) => (
                <option value="item" key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <AdminDataGrid
            TableRows={borrowers}
            TableColumns={gallonBorrowerColumn}
          />
        </div>
      </div>

      {updateGallonModalState && <AdminInventoryUpdateGallon />}

      <AdminInventoryFloatingActionButton />
    </div>
  );
}

export default AppInventory;
