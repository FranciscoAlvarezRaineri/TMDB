import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList } from "../store/reducers/list";
import { modifyUrl } from "../store/reducers/discoverUrl";
import { discover } from "../utils/tmdb.js";

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
import LogInBox from "./LogInBox";
import Modal from "@mui/material/Modal";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const Main = () => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openLogInBox, setOpenLogInBox] = useState(false);
  const [mediaSelect, setMediaSelect] = useState("/movie");

  const list = useSelector((state) => state.list);
  const discoverUrl = useSelector((state) => state.discoverUrl);

  useEffect(() => {
    dispatch(modifyUrl({ page: 1, media: mediaSelect }));
  }, [mediaSelect]);

  useEffect(() => {
    discover(discoverUrl).then((data) => {
      dispatch(newList(data?.results));
      setPageCount(data?.total_pages);
      setResultsCount(data?.total_results);
    });
  }, [discoverUrl]);

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
        handleLogInBox={() => setOpenLogInBox(true)}
      />
      <Modal
        open={openLogInBox}
        onClose={() => setOpenLogInBox(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <LogInBox handleLogInBox={() => setOpenLogInBox(false)} />
      </Modal>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
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
          flexDirection="column"
          marginBottom={2}
        >
          <ToggleButtonGroup
            color="primary"
            value={mediaSelect}
            exclusive
            onChange={(e, newSelect) => setMediaSelect(newSelect)}
            aria-label="Platform"
          >
            <ToggleButton value="/movie">Movies</ToggleButton>
            <ToggleButton value="/tv">TV Shows</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          id="pagination"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Pagination
            count={pageCount > 500 ? 500 : pageCount}
            page={discoverUrl.page}
            onChange={(event, value) => {
              dispatch(modifyUrl({ page: value }));
            }}
            siblingCount={0}
            boundaryCount={1}
          />
          <Typography variant="h6" textAlign="center">{`Showing results: ${
            discoverUrl.page * 20 - 19
          } to ${discoverUrl.page * 20} of ${resultsCount}`}</Typography>
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
          flexDirection="column"
        >
          <Typography variant="h6" textAlign="center">{`Showing results: ${
            discoverUrl.page * 20 - 19
          } to ${discoverUrl.page * 20} of ${resultsCount}`}</Typography>
          <Pagination
            count={pageCount > 500 ? 500 : pageCount}
            page={discoverUrl.page}
            onChange={(event, value) => {
              dispatch(modifyUrl({ page: value }));
            }}
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Main;
