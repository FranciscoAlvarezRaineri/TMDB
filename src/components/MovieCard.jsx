import React from "react";

const MovieCard = ({ item }) => {
  return (
    <div key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt="movie poster"
        height="100"
      />
    </div>
  );
};

export default MovieCard;
