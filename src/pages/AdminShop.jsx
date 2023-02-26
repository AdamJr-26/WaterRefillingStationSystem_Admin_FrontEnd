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
             <h1 >Coming soon!</h1>
      </div>
    </div>
  );
}

export default AdminShop;
