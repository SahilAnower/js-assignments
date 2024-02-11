import React from "react";
import { useQuizStore } from "../store/store";
import { Typography } from "@mui/material";

function OwnResult() {
  const ownResult = useQuizStore((state) => state.ownResult);
  return (
    <>
      {ownResult ? (
        <Typography variant="h4">Your Result: {ownResult}</Typography>
      ) : (
        <Typography variant="h4">Take the test to see your result!</Typography>
      )}
    </>
  );
}

export default OwnResult;
