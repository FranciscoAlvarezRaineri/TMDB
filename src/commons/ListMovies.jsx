import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList, clearList } from "../store/reducers/list";
import MovieCard from "../components/MovieCard";

const ListMovies = () => {
  const list = useSelector((state) => state.list);
  return (
    <>
      {list.map((item) => {
        return <MovieCard item={item} />;
      })}
    </>
  );
};

export default ListMovies;
