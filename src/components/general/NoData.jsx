import React from "react";
import heroImages from "../../assets/images/hero/index";

function NoData({ min_height }) {
  return (
    <div className="no-data-to-show" style={{ minHeight: `${min_height}px` }}>
      <div className="no-data-to-show--image-wrapper">
        <img src={heroImages.nodata} alt="nodata" />
      </div>
    </div>
  );
}

export default NoData;
