import React from "react";
import { useQuizStore } from "../store/store";
import { Typography } from "@mui/material";

function OwnResult() {
  const currResult = useQuizStore((state) => state.currResult);
  // console.log(currResult.score);

  function getBackgroundColorForResult(result) {
    if (Number(result) >= 3) {
      return "#0D9276"; // Green for passing score
    } else {
      return "#D04848"; // Red for failing score
    }
  }

  return (
    <>
      {currResult ? (
        <Typography
          variant="h6"
          sx={{
            backgroundColor: getBackgroundColorForResult(currResult?.score),
            padding: "0.5rem",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Your Result: {`${currResult?.score} / 5`}
        </Typography>
      ) : (
        <Typography variant="h6">Take the test to see your result!</Typography>
      )}
    </>
  );
}

export default OwnResult;
