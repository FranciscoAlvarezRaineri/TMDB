import React from "react";
import { useSelector } from "react-redux";
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
