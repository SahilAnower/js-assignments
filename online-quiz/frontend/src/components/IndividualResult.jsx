import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function IndividualResult({ result }) {
  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          gap: "2rem",
        }}
      >
        <ListItemAvatar>
          <Avatar>{result?.user?.username[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={result?.user?.email}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {result?.user?.username}
              </Typography>
              {` — ${result?.score} / 5`}
            </React.Fragment>
          }
        />
        <ListItemText
          primary={"Date"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {new Date(result?.createdAt).toLocaleDateString()}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemText
          primary={"Time"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {new Date(result?.createdAt).toLocaleTimeString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default IndividualResult;
