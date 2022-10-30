import React from "react";
import { HashLoader } from "react-spinners";
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <HashLoader
        color="#2389DA"
        loading={true}
        speedMultiplier={2}
        size={50}
      />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
