import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList } from "../store/reducers/list";
import { allMoviesByPopularity } from "../utils/tmdb";

//Components
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

//Material
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const Main = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const list = useSelector((state) => state.list);

  useEffect(() => {
    allMoviesByPopularity(page).then((result) => {
      dispatch(newList(result));
    });
  }, [page]);

  return (
    <>
      <SideBar
        open={open}
        handleDrawerChange={() => {
          setOpen(!open);
        }}
      />
      <NavBar
        open={open}
        handleDrawerChange={() => {
          setOpen(!open);
        }}
      />
      <main>
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
              The simple way to be up-to-date with the lastest releases and find
              out more about the classics.
            </Typography>
          </Container>
        </Box>

        <Box
          id="pagination"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            count={1000}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            siblingCount={0}
            boundaryCount={0}
          />
        </Box>

        <Container sx={{ py: 8 }} maxWidth="lg">
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
                  {" "}
                  {movie.poster_path ? (
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="movie poster"
                    />
                  ) : null}
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

        <Box
          id="pagination"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            count={10}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            siblingCount={0}
            boundaryCount={0}
          />
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Main;
