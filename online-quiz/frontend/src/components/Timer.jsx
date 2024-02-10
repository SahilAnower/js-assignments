import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function Timer({ seconds, setSeconds }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        // call api with data collected
        // redirect to results page
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Timer: {formatTime(seconds)}
      </Typography>
    </div>
  );
}

export default Timer;
