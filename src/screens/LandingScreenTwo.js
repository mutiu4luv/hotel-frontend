import React from "react";
import room2 from "../images/room2.jpeg";
const LandingScreenTwo = () => {
  return (
    <div className="row">
      <div className="col-md-5 land">
        <div className="  fonts">Mutiu Hotel and Suites services</div>
        <h1 style={{ textAlign: "center" }}>Dedicated To Your Peace Of Mind</h1>
      </div>
      <div className="col-md-5  land">
        <img src={room2} alt="vff" className="pic" />
      </div>

      <div className="back">
        <div> </div>
      </div>
    </div>
  );
};

export default LandingScreenTwo;
