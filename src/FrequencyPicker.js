import React, { useState } from "react";

const FrequencyPicker = ({ onFrequencyChange }) => {
  const [frequencyType, setFrequencyType] = useState("once");
  const [specificTime, setSpecificTime] = useState("");

  const handleFrequencySelect = (event) => {
    const value = event.target.value;
    setFrequencyType(value);
    onFrequencyChange(value);
  };

  return (
    <div className="frequency-picker">
      <h4>Select Frequency</h4>
      <div className="frequency-option">
        <input
          type="radio"
          id="once"
          name="frequency"
          value="once"
          checked={frequencyType === "once"}
          onChange={handleFrequencySelect}
        />
        <label htmlFor="once">Once</label>
      </div>
      <div className="frequency-option">
        <input
          type="radio"
          id="daily"
          name="frequency"
          value="daily"
          checked={frequencyType === "daily"}
          onChange={handleFrequencySelect}
        />
        <label htmlFor="daily">Daily</label>
      </div>
      <div className="frequency-option">
        <input
          type="radio"
          id="weekly"
          name="frequency"
          value="weekly"
          checked={frequencyType === "weekly"}
          onChange={handleFrequencySelect}
        />
        <label htmlFor="weekly">Weekly</label>
      </div>
      <div className="frequency-option">
        <input
          type="radio"
          id="monthly"
          name="frequency"
          value="monthly"
          checked={frequencyType === "monthly"}
          onChange={handleFrequencySelect}
        />
        <label htmlFor="monthly">Monthly</label>
      </div>
      {frequencyType !== "once" && (
        <div className="specific-time">
          <label htmlFor="specificTime">Specific Time:</label>
          <input
            type="datetime-local"
            id="specificTime"
            value={specificTime}
            onChange={(e) => setSpecificTime(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FrequencyPicker;
