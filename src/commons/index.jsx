import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList } from "../store/reducers/list";
import { modifyUrl } from "../store/reducers/discoverUrl";
import { logIn } from "../store/reducers/user";
import { discover } from "../utils/tmdb.js";
import { auth, onAuthStateChanged, signIn } from "../utils/firebase";

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
import LogInBox from "./LogInBox";
import Modal from "@mui/material/Modal";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Paginate from "./Paginate";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Main = () => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openLogInBox, setOpenLogInBox] = useState(false);
  const [mediaSelect, setMediaSelect] = useState("/movie");
  const [expandCard, setExpandCard] = useState(null);

  const list = useSelector((state) => state.list);
  const discoverUrl = useSelector((state) => state.discoverUrl);

  useEffect(() => {
    dispatch(modifyUrl({ media: mediaSelect, page: 1 }));
  }, [mediaSelect]);

  useEffect(() => {
    let cleanUp = false;

    discover(discoverUrl).then((data) => {
      if (!cleanUp) {
        dispatch(newList(data?.results));
        setPageCount(data?.total_pages);
        setResultsCount(data?.total_results || 0);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, [discoverUrl]);

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(logIn({ email: currentUser.email }));
    console.log(currentUser);
  });

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
        <Box ml={open ? 30 : 0} className="animation">
          {/*           <Box
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
                The simple way to be up-to-date with the lastest releases and
                find out more about the classics.
              </Typography>
            </Container>
          </Box> */}
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

          <Paginate pageCount={pageCount} resultsCount={resultsCount} />

          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              {list.map((media, i) => (
                <Grid item key={media.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      {media.poster_path ? (
                        <CardMedia
                          component="img"
                          image={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          alt="media poster"
                        />
                      ) : null}
                      <Collapse
                        in={expandCard === i}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6" align="left">
                            {media.title || media.name}
                          </Typography>
                          <Typography>{media.overview}</Typography>
                        </CardContent>
                      </Collapse>
                    </Box>
                    <CardActions>
                      <Button size="small">Watched</Button>
                      <Button size="small">Wanna watch</Button>
                      <Button
                        onClick={() => {
                          expandCard === i
                            ? setExpandCard(null)
                            : setExpandCard(i);
                        }}
                      >
                        {expandCard === i ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Paginate pageCount={pageCount} resultsCount={resultsCount} />
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Main;
