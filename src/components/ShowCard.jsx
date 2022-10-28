import React from "react";

const ShowCard = ({ item }) => {
  return (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt="poster"
        height="100"
      />
    </div>
  );
};

export default ShowCard;
