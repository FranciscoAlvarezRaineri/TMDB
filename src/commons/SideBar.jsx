import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { modifyUrl } from "../store/reducers/discoverUrl";

import { getGenres } from "../utils/tmdb";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Slider from "@mui/material/Slider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar({ open, handleDrawerChange }) {
  const dispatch = useDispatch();

  const [openIndex, setOpenIndex] = useState(0);

  const orders = [
    { name: "Popularity", value: "popularity" },
    { name: "Release Date", value: "release_date" },
    { name: "Title", value: "original_title" },
    { name: "Calification", value: "vote_average" },
  ];

  const [order, setOrder] = useState("popularity");
  const [desc, setDesc] = useState(true);

  const [voteCount, setVoteCount] = useState(0);

  const [adult, setAdult] = useState(false);

  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const [years, setYears] = React.useState([1873, 2023]);

  const discoverUrl = useSelector((state) => state.discoverUrl);

  const openCategory = (index) => {
    openIndex === index ? setOpenIndex(0) : setOpenIndex(index);
  };

  const handleYearSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setYears([Math.min(newValue[0], years[1]), years[1]]);
    } else {
      setYears([years[0], Math.max(newValue[1], years[0])]);
    }
  };

  useEffect(() => {
    getGenres(discoverUrl.media).then((result) => {
      setAllGenres(result);
      setGenres([]);
    });
  }, [discoverUrl.media]);

  useEffect(() => {
    dispatch(
      modifyUrl({
        page: 1,
        sort: `${order}.${desc ? "desc" : "asc"}`,
        genres,
        yeargte: years[0],
        yearlte: years[1],
        voteCount,
        adult,
      })
    );
  }, [desc, order, voteCount, genres, years, adult]);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerChange}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </DrawerHeader>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Divider />
          <ListSubheader component="div" id="nested-list-subheader">
            Order:
          </ListSubheader>
          <ListItemButton onClick={() => setDesc(!desc)}>
            <ListItemText primary="Ascending" />
            <Switch
              size="small"
              checked={desc}
              onChange={() => setDesc(!desc)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <ListItemText primary="Descending" />
          </ListItemButton>

          <ListItemButton onClick={() => openCategory(3)}>
            <ListItemText primary="Order by" />
            {openIndex == 3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIndex === 3} timeout="auto" unmountOnExit>
            <ToggleButtonGroup
              value={order}
              onChange={(e, newOrder) => setOrder(newOrder || order)}
              aria-label="text formatting"
              orientation="vertical"
              fullWidth
              exclusive
            >
              {orders.map((option, i) => (
                <ToggleButton
                  key={`order-${i}`}
                  value={option.value}
                  size="small"
                  fullWidth
                >
                  <Typography variant="button"> {option.name}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Collapse>

          <Divider />
          <ListSubheader component="div" id="nested-list-subheader">
            Filter:
          </ListSubheader>
          <ListItemButton onClick={() => openCategory(4)}>
            <ListItemText primary="Min Vote Count" />
            {openIndex == 4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIndex === 4} timeout="auto" unmountOnExit>
            <Box
              id="vote_count"
              fullWidth
              sx={{
                padding: 2,
              }}
              display="flex"
              justifyContent="start"
              alignItems="center"
              flexDirection="column"
            >
              <Slider
                value={voteCount}
                onChange={(e, newValue) => setVoteCount(newValue)}
                valueLabelDisplay="on"
                disableSwap
                min={0}
                max={10000}
              />
            </Box>
          </Collapse>
          <ListItemButton onClick={() => openCategory(1)}>
            <ListItemText primary="Genre" />
            {openIndex == 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
            <ToggleButtonGroup
              value={genres}
              onChange={(e, newGenres) => setGenres(newGenres)}
              aria-label="text formatting"
              orientation="vertical"
              fullWidth
            >
              {allGenres?.map((genre, i) => (
                <ToggleButton
                  key={`genre-${i}`}
                  value={genre.id}
                  size="small"
                  fullWidth
                >
                  <Typography variant="button"> {genre.name}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Collapse>

          <ListItemButton onClick={() => openCategory(2)}>
            <ListItemText primary="Year" />
            {openIndex == 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIndex === 2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box sx={{ mr: 2, ml: 2, mt: 4 }}>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={years}
                  onChange={handleYearSlider}
                  getAriaValueText={""}
                  valueLabelDisplay="on"
                  disableSwap
                  min={1873}
                  max={2023}
                />
              </Box>
            </List>
          </Collapse>

          <Divider />
          <ListSubheader component="div" id="nested-list-subheader">
            Include:
          </ListSubheader>
          <ListItemButton id="include_adult" onClick={() => setAdult(!adult)}>
            <ListItemText primary="Adult" />
            <Switch
              size="small"
              checked={adult}
              onChange={() => setAdult(!adult)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
