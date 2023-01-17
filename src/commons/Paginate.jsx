import React from "react";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const Paginate = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Pagination
        count={10}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={0}
      />
    </Box>
  );
};

export default Paginate;
