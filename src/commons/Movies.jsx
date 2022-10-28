import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList, clearList } from "../store/reducers/list";
import axios from "axios";
import ListMovies from "./ListMovies";

const Movies = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=7f7b6b76f674af7ac35279fb451df8dc&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      )
      .then((response) => {
        console.log(response);
        dispatch(newList(response.data.results));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>Popular Movies:</h3>
      <ListMovies />
    </div>
  );
};

export default Movies;
