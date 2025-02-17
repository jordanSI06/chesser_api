import React from "react";

const DateSelector = ({ year, month, setYear, setMonth }) => {
  return (
    <div>
      <label>
        Année:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <label>
        Mois:
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value.padStart(2, "0"))}
        />
      </label>
    </div>
  );
};

export default DateSelector;