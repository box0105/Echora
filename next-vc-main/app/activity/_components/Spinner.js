import React from "react";
import "../_styles/spinner.scss";

export default function Spinner({ message = "伺服器啟動中，請稍後" }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

