import React from "react";

import "./CalorieCalc.scss";

const CalorieCalc = ({
  setWeight,
  setDuration,
  weight,
  duration,
  calculateCal,
}) => {
  return (
    <div className="calDiv">
      <div className="calorie_content">
        <div className="calc">
          <h1>Weight(kg)</h1>
          <input
            type="text"
            className="calc_input"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
          />
        </div>
        <div className="calc">
          <h1>Duration(in min)</h1>
          <input
            type="text"
            className="calc_input"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </div>
      </div>
      <div className="calc_submit">
        <button onClick={calculateCal}>Calculate</button>
      </div>
    </div>
  );
};

export default CalorieCalc;
