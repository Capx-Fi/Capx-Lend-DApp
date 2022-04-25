import React from "react";
import SvgIcon from "../../svg-icon/svg-icon";

function StatusText({ type, title }) {
  return (
    <div>
      <div className={type}>
        <SvgIcon name={type} viewbox="0 0 115.002 115.002" />
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default StatusText;
