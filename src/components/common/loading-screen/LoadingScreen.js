import React from "react";
import LendLogo from "../../../assets/images/svg/lend-logo.svg";

function LoadingScreen() {
  return (
    <div className="align-middle justify-center justify-items-center bg-dark-400 flex h-screen">
      <img
        alt="logo"
        src={LendLogo}
        className="animate-pulse phone:w-55v breakpoint:w-20v h-auto align-middle justify-center m-auto"
      />
    </div>
  );
}

export default LoadingScreen;
