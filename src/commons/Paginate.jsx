import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyUrl } from "../store/reducers/discoverUrl";

import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

const Paginate = ({ pageCount, resultsCount }) => {
  const dispatch = useDispatch();

  const discoverUrl = useSelector((state) => state.discoverUrl);

  return (
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
        onChange={(e, value) => {
          dispatch(modifyUrl({ page: value }));
        }}
        siblingCount={1}
        boundaryCount={1}
      />
      <Typography variant="h6" textAlign="center">{`Showing results: ${
        discoverUrl.page * 20 - 19
      } to ${
        discoverUrl.page * 20 < resultsCount
          ? discoverUrl.page * 20
          : resultsCount
      } of ${resultsCount}`}</Typography>
    </Box>
  );
};

export default Paginate;
