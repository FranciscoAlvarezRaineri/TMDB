import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../store/reducers/user";
import { createUser, signIn } from "../utils/firebase";
//Material
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LogInBox = ({ handleLogInBox }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectSignIn, setSelectSignIn] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((user) => {
        /*dispatch(logIn({ ...user }));*/
        setEmail("");
        setPassword("");
        handleLogInBox();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    createUser(email, password, name, lastname)
      .then((user) => {
        dispatch(logIn({ ...user }));
        setEmail("");
        setPassword("");
        setName("");
        setLastname("");
        handleLogInBox();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: "white" }}>
      <Typography variant="h4" sx={{ mt: 2 }} align="center">
        Welcome!
      </Typography>
      {selectSignIn ? (
        <Box
          component="form"
          onSubmit={(e) => handleLoginSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => setSelectSignIn(false)}
          >
            Sign Up
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={(e) => handleSignupSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Lastname"
            id="lastname"
            autoComplete="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => setSelectSignIn(true)}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LogInBox;
