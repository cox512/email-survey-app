/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: "5px" }} {...input} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};
