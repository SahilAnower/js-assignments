import React from "react";
import { useQuizStore } from "../store/store";
import { Typography } from "@mui/material";

function OwnResult() {
  const currResult = useQuizStore((state) => state.currResult);
  // console.log(currResult.score);
  return (
    <>
      {currResult ? (
        <Typography variant="h4">
          Your Result: {`${currResult?.score} / 5`}
        </Typography>
      ) : (
        <Typography variant="h4">Take the test to see your result!</Typography>
      )}
    </>
  );
}

export default OwnResult;
