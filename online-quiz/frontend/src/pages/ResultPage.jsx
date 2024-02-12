import * as React from "react";
import List from "@mui/material/List";
// import Individual from "../components/IndividualResult";
import IndividualResult from "../components/IndividualResult";
import { Typography } from "@mui/material";
import OwnResult from "../components/OwnResult";
import { showErrorToast } from "../toast/toastMessage";
import { getAllResultsAPI } from "../api/result";
import Box from "@mui/material/Box";

export default function AlignItemsList() {
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    async function getResults() {
      try {
        const response = await getAllResultsAPI();
        setResults(response);
      } catch (error) {
        showErrorToast("Cannot get results");
      }
    }
    getResults();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <OwnResult />
        <Typography
          variant="h4"
          sx={{
            mt: "1rem",
          }}
        >
          All Scores
        </Typography>
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
      </Box>
    </>
  );
}
