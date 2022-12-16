import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../store/reducers/user";
import { createUser, signIn } from "../utils/firebase";
//Material
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectSignIn, setSelectSignIn] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((response) => {
        const user = response.user;
        dispatch(logIn({ ...user }));
        console.log(user);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    createUser(email, password, name, lastname)
      .then(() => {
        dispatch(
          logIn({
            email,
            name,
            lastname,
          })
        );
        setEmail("");
        setPassword("");
        setName("");
        setLastname("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>The Movie DataBase</h1>
      {user.email ? <div>{user.email}</div> : null}
      {selectSignIn ? (
        <Container component="main" maxWidth="xs">
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setSelectSignIn(false)}
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setSelectSignIn(true)}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Main;
