import React from "react";
import { useSelector } from "react-redux";
import ShowCard from "../components/ShowCard";

const ListShows = () => {
  const list = useSelector((state) => state.list);
  return (
    <>
      {list.map((item) => {
        return <ShowCard item={item} />;
      })}
    </>
  );
};

export default ListShows;
