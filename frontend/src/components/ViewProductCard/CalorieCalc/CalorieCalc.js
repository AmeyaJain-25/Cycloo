import React from "react";

import "./CalorieCalc.scss";

const CalorieCalc = () => {
  return (
    <>
      <div className="calorie_content">
        <div className="calc_wt">
          <h1>Weight(kg)</h1>
          <input type="text" className="calc_input" />
        </div>
        <div className="calc_duration">
          <h1>Duration(in minutes)</h1>
          <input type="text" className="calc_input" />
        </div>
      </div>
      <div className="calc_submit">
        <button>Calculate</button>
      </div>
    </>
  );
};

export default CalorieCalc;
