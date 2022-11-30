import React from "react";
import { Icon } from "@iconify/react";
import { addGallonState, addVehicleState } from "../../lib/store/globalPopupSlice";
import { useDispatch, useSelector } from "react-redux";
import tricycle from "../../assets/images/transparent/tricycle-white.png";
import gallon from "../../assets/images/transparent/gallon-white.png";
function AdminInventoryFloatingActionButton() {
  const dispatch = useDispatch();

  return (
    <div className="admin-inventory-floating-action-button">
      <div className="admin-inventory-floating-action-button--action-buttons">
        <div
          onClick={() => dispatch(addGallonState())}
          className="admin-inventory-floating-action-button--action-buttons__option-button"
        >
          <img src={gallon} alt="tricycle" srcSet="" />
        </div>
        <div
          onClick={() => dispatch(addVehicleState())}
          className="admin-inventory-floating-action-button--action-buttons__option-button"
        >
          <img src={tricycle} alt="tricycle" srcSet="" />
        </div>
        <button className="admin-inventory-floating-action-button--action-buttons__option-button">
         return 
        </button>
        <button className="admin-inventory-floating-action-button--action-buttons__toggle-button">
          <Icon icon="akar-icons:plus" />
        </button>
      </div>
    </div>
  );
}

export default AdminInventoryFloatingActionButton;
