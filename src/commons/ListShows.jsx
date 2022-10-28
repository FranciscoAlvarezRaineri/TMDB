import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newList, clearList } from "../store/reducers/list";
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
