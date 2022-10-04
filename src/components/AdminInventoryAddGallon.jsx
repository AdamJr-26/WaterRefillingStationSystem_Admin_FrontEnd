import React from "react";
import { Icon } from "@iconify/react";
import gallon from "../assets/images/gallons_transparent/icons/6L.png";
import ScrollContainer from "react-indiana-drag-scroll";
import AdminTextinput from "./AdminTextinput";
import { addGallonState } from "../lib/store/globalPopupSlice";
import { useDispatch } from "react-redux";
function AdminInventoryAddGallon() {
  const dispatch = useDispatch();

  return (
    <div className="admin-inventory-add-gallon">
      <div className="admin-inventory-add-gallon--head">
        <p>Add New Gallon</p>
        <button onClick={()=>dispatch(addGallonState())}>
          <Icon icon="bi:x" />
        </button>
      </div>
      <span className="select-gallon">Select Gallon</span>
      <div className="admin-inventory-add-gallon--images">
        <div className="admin-inventory-add-gallon--images__input-file">
          <input type="file" name="" id="" />
          <Icon icon="bx:image-add" className="icon" />
        </div>

        <ScrollContainer className="admin-inventory-add-gallon--images__list">
          <div
            style={{ maxWidth: 150, display: "flex", flexFlow: "row nowrap" }}
          >
            {[1, 2, 3, 4, 5].map((item, i) => (
              <img src={gallon} alt="gallon" srcSet="" key={i} />
              // pag click sa image, automatic mag fill up yung form
            ))}
          </div>
        </ScrollContainer>
      </div>
      <span className="gallon-description">Description</span>
      <div className="admin-inventory-add-gallon--inputs">
        <AdminTextinput label="Name" type="text" />
        <AdminTextinput label="LIter(s)" type="text" />
        <div className="prices">
          <span className="title">Prices</span>
          <AdminTextinput label="Delivery" type="text" />
        <AdminTextinput label="Pick-Up" type="text" />
        <AdminTextinput label="Discounted" type="text" />
        </div>
        <AdminTextinput label="Total" type="text" />
      </div>
      <div className="admin-inventory-add-gallon--buttons">
        <button type="reset" className="reset" >Clear</button>
        <button type="button" className="add" >Add</button>
      </div>
    </div>
  );
}

export default AdminInventoryAddGallon;

