import React from "react";

import "./CalorieCalc.scss";

const CalorieCalc = () => {
  return (
    <div className="calDiv">
      <div className="calorie_content">
        <div className="calc">
          <h1>Weight(kg)</h1>
          <input type="text" className="calc_input" />
        </div>
        <div className="calc">
          <h1>Duration(in min)</h1>
          <input type="text" className="calc_input" />
        </div>
      </div>
      <div className="calc_submit">
        <button>Calculate</button>
      </div>
    </div>
  );
};

export default CalorieCalc;
