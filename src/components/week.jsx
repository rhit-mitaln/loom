import React, { useEffect, useState } from "react";

function WeekProgress() {
  const [currentDay, setCurrentDay] = useState(0);
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

  useEffect(() => {
    const today = new Date().getDay();
    setCurrentDay(today === 0 ? 6 : today - 1);
  }, []);

  const getStyles = (index) => ({
    position: "relative",
    height: "32px",
    width: "32px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    backgroundColor: index === currentDay 
      ? "#22c55e"  // green for current day
      : index < currentDay 
        ? "#ffffff" // white for completed days
        : "#f3f4f6", // gray for upcoming days
    border: index < currentDay && index !== currentDay ? "1px solid #e5e7eb" : "none",
    color: index === currentDay ? "#ffffff" : "inherit",
    opacity: index <= currentDay ? "1" : "0.7",
    // Add glow effect for current day
    boxShadow: index === currentDay 
      ? "0 0 12px rgba(34, 197, 94, 0.5)" // Green glow matching the background color
      : "none",
    // Optional: add slight hover effect
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-1px)"
    }
  });

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "16px"
  };

  const rowStyles = {
    display: "flex",
    gap: "8px"
  };

  const labelStyles = {
    width: "32px",
    textAlign: "center",
    fontSize: "10px",
    color: "#ffffff",
    fontFamily: "Rubik",
    fontWeight: "400"
  };

  return (
    <div style={containerStyles}>
      <div style={rowStyles}>
        {weekdays.map((day, index) => (
          <div
            key={day}
            style={getStyles(index)}
            aria-label={`${day} ${
              index === currentDay
                ? "(Current day)"
                : index < currentDay
                ? "(Completed)"
                : "(Upcoming)"
            }`}
          />
        ))}
      </div>
      <div style={rowStyles}>
        {weekdays.map((day) => (
          <div key={day} style={labelStyles}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekProgress;