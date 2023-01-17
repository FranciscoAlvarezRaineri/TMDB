import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList, clearList } from "../store/reducers/list";
import { logOut } from "../store/reducers/user";
import { searchMovies } from "../utils/tmdb";

import LogInBox from "./LogInBox";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [logInPop, setLogInPop] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(search).then((result) => {
      console.log(result);
      dispatch(newList(result));
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            TMDB
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <form onSubmit={(e) => handleSearch(e)}>
            <Input
              placeholder="Search…"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outlined">
              <SearchIcon />
            </Button>
          </form>
          {user.email ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <>
              <Button
                type="button"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => setLogInPop(true)}
              >
                Sign Up
              </Button>
              <Dialog open={logInPop} onClose={() => setLogInPop(false)}>
                <LogInBox />
              </Dialog>
            </>
          )}
        </Toolbar>
      </AppBar>
      {
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={() => {
            handleMenuClose();
          }}
        >
          <MenuItem>{user.name}</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
            Favorites
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
            My account
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setLogInPop(false);
              dispatch(logOut());
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      }
    </Box>
  );
}
