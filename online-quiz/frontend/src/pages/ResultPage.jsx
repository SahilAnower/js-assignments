import * as React from "react";
import List from "@mui/material/List";
// import Individual from "../components/IndividualResult";
import IndividualResult from "../components/IndividualResult";
import { Typography } from "@mui/material";
import OwnResult from "../components/OwnResult";

const results = [
  {
    _id: "65c7cc024974c80c91944e8f",
    user: {
      _id: "65c7ca44aa744ca495b3ed44",
      username: "Test user",
      email: "test@gmail.com",
    },
    score: 2,
    createdAt: "2024-02-10T19:18:26.848Z",
    updatedAt: "2024-02-10T19:18:26.848Z",
  },
  {
    _id: "65c7cc024974c80c91944e89",
    user: {
      _id: "65c7ca44aa744ca495b3ed44",
      username: "Sahil Anower",
      email: "sahil@gmail.com",
    },
    score: 5,
    createdAt: "2024-02-10T19:18:26.848Z",
    updatedAt: "2024-02-10T19:18:26.848Z",
  },
];

export default function AlignItemsList() {
  return (
    <>
      <OwnResult />
      <Typography variant="h3">All Scores</Typography>
      <List
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {results.map((result) => (
          <IndividualResult key={result?._id} result={result} />
        ))}
      </List>
    </>
  );
}
