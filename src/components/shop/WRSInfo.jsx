import React from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "@chakra-ui/react";
import AddProductModal from "./modal/AddProductModal";
import { useAuth } from "../../hooks/auth";

function WRSInfo() {
  const { userProfile } = useAuth();
  const address = userProfile.data.address;
  return (
    <div className="shop-wrs-info">
      <div className="shop-wrs-info--image-wrapper">
        <img src="" alt="" />
      </div>
      <div className="shop-wrs-info--additional-info">
        <div className="shop-wrs-info--additional-info__name-icon">
          <p>{userProfile.data.wrs_name} </p>
        </div>
        <div className="shop-wrs-info--additional-info__about-location">
          <div className="shop-wrs-info-about-location-address-wrapper">
            <p>
              <Icon icon="material-symbols:location-on" />
            </p>
            <p>{`${address.street_building} ${address.barangay} ${address.city} ${address.province}`}</p>
          </div>
        </div>
      </div>
      <div className="shop-wrs-info--buttons-wrapper">
        <Tooltip label="Edit">
          <button>
            <Icon icon="majesticons:edit-pen-2-line" />
          </button>
        </Tooltip>
        <Tooltip label="Schedules">
          <button>
            <Icon icon="grommet-icons:schedules" />
          </button>
        </Tooltip>
        <AddProductModal />
      </div>
    </div>
  );
}

export default WRSInfo;
