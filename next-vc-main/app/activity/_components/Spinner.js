import React from "react";
import "../_styles/spinner.scss";

export default function Spinner({ message = "資料載入中..." }) {
  return (
    <div className="spinner-wrapper">
      <div className="wave-spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{message}</p>
    </div>
  );
}