import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList } from "../store/reducers/list";
import { allByPopularity } from "../utils/tmdb";

//Components
import LogInBox from "./LogInBox";
import NavBar from "./NavBar";
//Material
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const list = useSelector((state) => state.list);

  useEffect(() => {
    allByPopularity().then((result) => {
      dispatch(newList(result));
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
              mt: 3,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                The Movie DataBase
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                The simple way to be up-to-date with the lastest releases and
                find out more about the classics.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {list.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="movie poster"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                      </Typography>
                      <Typography>{movie.overview}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </>
  );
};

export default Main;
