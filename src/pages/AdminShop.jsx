import React from "react";
import { Icon } from "@iconify/react";
import gallon from "../assets/images/gallons_transparent/icons/20Lslim.png";
function AdminShop() {
  return (
    <div className="admin-shop">
      <div className="admin-shop--header">
        <span>You Are Selling</span>
        <button>
          <Icon icon="ant-design:plus-outlined" />
        </button>
      </div>
      <div className="admin-shop--card-wrapper">
        {[1, 3, 4, 5].map((item, i) => (
          <div className="admin-shop--card-wrapper__card" key={i}>
            <div className="image-wrapper">
              <img src={gallon} alt="gallon" />
            </div>
            <div className="detail">
              <span>US-Gallon</span>
              <span>25 Liters</span>
              <span>P 25.00</span>
            </div>
            <button>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminShop;
