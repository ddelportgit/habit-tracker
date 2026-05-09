import React from "react";

const Heatmap = ({ habitId, completions }) => {
  const weeks = 12;
  const days = weeks * 7;
  const today = new Date();

  function getDates() {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }

  function getCompletedDates() {
    return new Set(completions.filter((c) => c.habit_id === habitId).map((c) => c.completed_date));
  }

  const dates = getDates();
  const completed = getCompletedDates();

  const columns = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(dates.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className="heatmap">
      {columns.map((week, wi) => (
        <div className="heatmap-column" key={wi}>
          {week.map((date) => (
            <div
              key={date}
              className={`heatmap-day ${completed.has(date) ? "heatmap-day-done" : "heatmap-day-empty"}`}
              title={date}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
