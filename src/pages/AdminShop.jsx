import React from "react";
import { Icon } from "@iconify/react";
import gallon from "../assets/images/gallons_transparent/icons/20Lslim.png";
import WRSInfo from "../components/shop/WRSInfo";
import ShopProducts from "../components/shop/ShopProducts";
function AdminShop() {
  return (
    <div className="admin-shop">
      <div>
        <WRSInfo />
      </div>
      <div>
        <ShopProducts />
      </div>
    </div>
  );
}

export default AdminShop;
