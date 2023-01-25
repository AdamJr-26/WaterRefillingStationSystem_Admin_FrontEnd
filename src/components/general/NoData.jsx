import React from "react";
import heroImages from "../../assets/images/hero/index";

function NoData() {
  return (
    <div className="no-data-to-show">
      <div className="no-data-to-show--image-wrapper">
        <img src={heroImages.nodata} alt="nodata" />
      </div>
    </div>
  );
}

export default NoData;
