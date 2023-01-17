import React from "react";

import Copyright from "./Copyright";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        The Movie DataBase
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        The simple way to be up-to-date with the lastest releases and find out
        more about the classics.
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
