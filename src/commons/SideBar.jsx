import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { newList } from "../store/reducers/list";

import { getMovieGenres } from "../utils/tmdb";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

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

export default function SideBar({
  open,
  handleDrawerChange,
  handleFilterSubmit,
  handleYearSubmit,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState(0);
  // const [genre, setGenre] = useState([]);
  // const [year, setYear] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [years, setYears] = React.useState([1874, 2023]);

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
    getMovieGenres().then((result) => {
      setAllGenres(result);
    });
  }, []);

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
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Filter by categories
            </ListSubheader>
          }
        >
          <ListItemButton onClick={() => openCategory(1)}>
            <ListItemText primary="Genre" />
            {openIndex == 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All" />
              </ListItemButton> */}
              {allGenres.map((genre, i) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={`genre-${i}`}
                  onClick={() => handleFilterSubmit(genre.id)}
                >
                  <ListItemText primary={genre.name} />
                </ListItemButton>
              ))}
            </List>
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
                  min={1874}
                  max={2023}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                m={1}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleYearSubmit(years)}
                >
                  Submit
                </Button>
              </Box>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
