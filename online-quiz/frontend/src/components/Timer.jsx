import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function Timer({ seconds, setSeconds }) {
  const [timerColor, setTimerColor] = useState("");

  const updateTimerColor = (seconds) => {
    // Calculate the color based on the remaining seconds
    const red = Math.floor(((300 - seconds) * 255) / 300);
    const green = Math.floor((seconds * 255) / 300);
    const color = `rgba(${red}, ${green}, 0, 1)`; // Red to green gradient
    setTimerColor(color);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //       updateTimerColor(seconds - 1);
  //     } else {
  //       clearInterval(interval);
  //       // call api with data collected
  //       // redirect to results page
  //     }
  //   }, 1000);

  //   // Clean up interval on component unmount
  //   return () => clearInterval(interval);
  // }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%",
        gap: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "0px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AccessTimeIcon
          sx={{
            fontSize: "1.6rem",
            color: `${timerColor}`,
          }}
        />
      </Typography>
      {/* <Divider /> */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "0px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {formatTime(seconds)}
      </Typography>
    </Box>
  );
}

export default Timer;
