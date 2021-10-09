import React from "react";

import "./CalorieCalc.scss";

const CalorieCalc = () => {
  return (
    <>
      <div className="calorie_content">
        <div className="calc_age">
          <h1>Age</h1>
          <input type="text" className="calc_input" />
        </div>
        <div className="form_check">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="male"
              value="male"
            />
            <label class="form-check-label" for="male">
              Male
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="female"
              value="female"
            />
            <label class="form-check-label" for="female">
              Female
            </label>
          </div>
        </div>
        <div className="calc_wt">
          <h1>Weight(kg)</h1>
          <input type="text" className="calc_input" />
        </div>
        <div className="calc_duration">
          <h1>Duration(in minutes)</h1>
          <input type="text" className="calc_input" />
        </div>
        <div className="calc_submit">
          <button>Calculate</button>
        </div>
      </div>
    </>
  );
};

export default CalorieCalc;
