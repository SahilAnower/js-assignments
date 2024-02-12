import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createUserAPI } from "../api/user";
import { useQuizStore } from "../store/store";
import { showErrorToast, showSuccessToast } from "../toast/toastMessage";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="https://www.linkedin.com/in/sahilanower2/">
        Sahil Anower
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function HomePage() {
  const setUserStore = useQuizStore((state) => state.setUser);
  const userStore = useQuizStore((state) => state.user);
  const setCurrResult = useQuizStore((state) => state.setCurrResult);
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: "",
    username: "",
  });

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(user);
    // call api
    try {
      const response = await createUserAPI(user);
      // console.log(response);
      setUserStore({
        ...userStore,
        email: response?.email,
        username: response?.username,
        userId: response?._id,
      });
      showSuccessToast("Credentials saved successfully for exam!");
      setCurrResult(null);
      setTimeout(() => {
        navigate("/exam");
      }, 2000);
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    }
    // store email, username, userId in store
    setUser({
      email: "",
      username: "",
    });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Credentials
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user?.email}
            onChange={handleChange}
            error={!isEmailValid(user.email)}
            helperText={
              !isEmailValid(user.email) ? "Invalid email address" : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="username"
            value={user?.username}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!user.email || !user.username}
          >
            Start test
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
