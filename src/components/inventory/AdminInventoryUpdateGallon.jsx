import React from "react";
import AdminTextinput from "./AdminTextinput";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  addGallonState,
  updateGallonState,
} from "../lib/store/globalPopupSlice";
import { useDispatch, useSelector } from "react-redux";
function AdminInventoryUpdateGallon() {
  const dispatch = useDispatch();
  const [borrowed, setBorrowed] = useState(0);
  const [available, setAvailable] = useState(0);
  const [total, setTotal] = useState(0);
  const [add, setAdd] = useState(0);
  const [price, setPrice] = useState(0);
  return (
    <div className="admin-inventory-update-gallon">
      <div className="admin-inventory-update-gallon--header">
        <p>Update</p>
        <button onClick={() => dispatch(updateGallonState())}>
          <Icon icon="bi:x" />
        </button>
      </div>
      <p className="admin-inventory-update-gallon--gallon-name">Faucet</p>
      <div className="admin-inventory-update-gallon--inputs">
        <AdminTextinput
          label="Borrowed"
          type="text"
          value={borrowed}
          setValue={setBorrowed}
          isDisabled={true}
        />
        <AdminTextinput
          label="Available"
          type="text"
          value={available}
          setValue={setAvailable}
        />
        <AdminTextinput
          label="Price"
          type="text"
          value={price}
          setValue={setPrice}
        />
        <AdminTextinput label="Add" type="text" value={add} setValue={setAdd} />
        <AdminTextinput
          label="Total"
          type="text"
          value={total}
          setValue={setTotal}
          isDisabled={true}
        />
      </div>
      <div className="admin-inventory-update-gallon--buttons">
        <button onClick={() => dispatch(updateGallonState())}>Exit</button>
        <button className="admin-inventory-update-gallon--buttons__update">
          Update
        </button>
      </div>
    </div>
  );
}

export default AdminInventoryUpdateGallon;
