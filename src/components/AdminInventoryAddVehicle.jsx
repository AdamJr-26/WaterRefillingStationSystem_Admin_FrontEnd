import React from "react";
import { Icon } from "@iconify/react";
import gallon from "../assets/images/gallons_transparent/icons/6L.png";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminTextinput from "./AdminTextinput";
import { addVehicleState } from "../lib/store/globalPopupSlice";
import { useDispatch } from "react-redux";
function AdminInventoryAddVehicle() {
  const dispatch = useDispatch();
  return (
    <div className="admin-inventory-add-vehicle">
      <div className="admin-inventory-add-gallon--head">
        <p>Add New Vehicle</p>
        <button onClick={() => dispatch(addVehicleState())}>
          <Icon icon="bi:x" />
        </button>
      </div>
      <span className="select-gallon">Select Vehicle</span>
      <div className="admin-inventory-add-vehicle--images">
        <div className="admin-inventory-add-vehicle--images__input-file">
          <input type="file" name="" id="" />
          <Icon icon="bx:image-add" className="icon" />
        </div>

        <ScrollContainer className="admin-inventory-add-vehicle--images__list">
          <div
            style={{ maxWidth: 150, display: "flex", flexFlow: "row nowrap" }}
          >
            {[1, 2, 3, 4, 5].map((item, i) => (
              <img src="https://www.downloadclipart.net/large/auto-rickshaw-png-hd.png" alt="gallon" srcSet="" key={i} />
              // pag click sa image, automatic mag fill up yung form
            ))}
          </div>
        </ScrollContainer>
      </div>
      <span className="gallon-description">Description</span>
      <div className="admin-inventory-add-vehicle--inputs">
        <AdminTextinput label="Vehicle Name" type="text" />
        <AdminTextinput label="Plate Number" type="text" />
        <textarea name="description" id="description" cols="30" rows="10" placeholder="Description"></textarea>
      </div>
      <div className="admin-inventory-add-vehicle--buttons">
        <button type="reset" className="reset" >Clear</button>
        <button type="button" className="add" >Add</button>
      </div>
    </div>
  );
}

export default AdminInventoryAddVehicle;
