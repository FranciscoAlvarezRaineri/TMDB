import React from "react";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="http://farportfolio.netlify.app"
        target="_blank"
      >
        Francisco Alvarez Raineri
      </Link>
      {", 2023."}
    </Typography>
  );
};

export default Copyright;
