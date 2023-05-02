import React from "react";
import loading from "../assets/images/svg/loading.svg";
import cupGif from "../assets/images/gif/cup.gif";
function Loading() {
  return (
    <div className="loading-screen-container">
      <img className="loading-screen-container--cup" src={cupGif} alt="" />
      <div className="loading-screen-container--loading-text-container">
        <p className="loading-screen-container--loading-text-container__loading-text">
          Please wait
        </p>
        <p className="loading-screen-container--loading-text-container__dot-1">
          .
        </p>
        <p className="loading-screen-container--loading-text-container__dot-2">
          .
        </p>
        <p className="loading-screen-container--loading-text-container__dot-3">
          .
        </p>
      </div>
    </div>
  );
}

export default Loading;
