import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import { logIn, logOut } from "../store/reducers/user";
import { newList, clearList } from "../store/reducers/list";
import ListMovies from "./ListMovies";
import Welcome from "./Welcome";
import Movies from "./Movies";
import Shows from "./Shows";

const Main = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [userFavourites, setUserFavourites] = useState({});
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showFavs, setShowFavs] = useState(false);

  const [search, setSearch] = useState("");
  const [searchSelect, setSearchSelect] = useState("Movies");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const favourites = useSelector((state) => state.list);

  useEffect(() => {
    axios
      .get("/api/user/secret")
      .then((res) => {
        res.data ? dispatch(logIn(res.data)) : dispatch(logOut());
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user.id) {
      axios
        .get(`/api/favourites/${user.id}`)
        .then((response) => {
          dispatch(newList(response.data));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(clearList());
    }
  }, [user, showFavs]);

  useEffect(() => {
    setUserFavourites([]);
    if (userDetails.id) {
      axios
        .get(`/api/favourites/${userDetails.id}`)
        .then((response) => {
          dispatch(newList(response.data));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(clearList());
    }
  }, [userDetails]);

  const handleSearchUserSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/api/user/search/${searchUser}`)
      .then((res) => setUsers(res.data));
  };

  const handleSearchMovieSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/api/movies/${searchMovie}`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  const handleDetails = (e) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${e.target.id}?api_key=7f7b6b76f674af7ac35279fb451df8dc`
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        setDetails({ title: "Fail to load", overview: "" });
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", { name, password })
      .then((res) => {
        dispatch(logIn(res.data));
        setName("");
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    axios.post("/api/user/secret").then(() => dispatch(logOut()));
  };

  const handleFavourites = () => {
    axios
      .get(`/api/favourites/${user.id}`)
      .then((response) => {
        dispatch(newList(response.data));
        setShowFavs(!showFavs);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (e) => {
    const movieId = e.target.id;
    if (!favourites.includes(movieId)) {
      axios
        .put("/api/user/add_favourite", {
          userId: user.id,
          movieId,
        })
        .then(() => {
          axios
            .get(`/api/favourites/${user.id}`)
            .then((response) => {
              dispatch(newList(response.data));
            })
            .catch((err) => console.log(err));
        });
    }
  };
  const handleRemove = (e) =>
    axios
      .put("/api/user/remove_favourite", {
        userId: user.id,
        movieId: e.target.id,
      })
      .then(() => {
        axios
          .get(`/api/favourites/${user.id}`)
          .then((response) => {
            dispatch(newList(response.data));
          })
          .catch((err) => console.log(err));
      });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("search", search);
    console.log("searchSelect", searchSelect);
  };
  return (
    <>
      <h1>The Movie Database</h1>
      <nav className=".navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-item btn btn-outline-light" to={`/movies`}>
            Movies
          </Link>
          <Link className="nav-item btn btn-outline-light" to={`/shows`}>
            TV Shows
          </Link>

          <div className="nav-item">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button type="submit">Search</button>

              <button type="button" onClick={() => setOpen(!open)}>
                {searchSelect}
              </button>
              {open ? (
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(!open);
                        setSearchSelect("Movies");
                      }}
                    >
                      Movies
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(!open);
                        setSearchSelect("TV Shows");
                      }}
                    >
                      TV Shows
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(!open);
                        setSearchSelect("Users");
                      }}
                    >
                      Users
                    </button>
                  </li>
                </ul>
              ) : (
                <div></div>
              )}
            </form>
          </div>
          <div className="nav-item">
            <h3>User Login:</h3>
            {user.name ? (
              <>
                <h6>{user.name}</h6>
                <button onClick={handleLogOut}>LogOut!</button>
                <button onClick={handleFavourites}>Favourites</button>
              </>
            ) : (
              <>
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <button type="submit">LogIn!</button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/shows" element={<Shows />}></Route>
        </Routes>
        {showFavs ? (
          <>
            <h3>Favourites:</h3>
            <ListMovies />
          </>
        ) : (
          <></>
        )}
        <div>
          {users.map((item) => {
            return (
              <div key={item.id}>
                <span>{item.name}</span>
                <button onClick={() => setUserDetails(item)}>Details</button>
              </div>
            );
          })}
        </div>
        <div>
          {userDetails.id ? (
            <>
              <h3>{userDetails.name}</h3>
              <h6>Favourites:</h6>
              {userFavourites.map((item) => {
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
              })}
            </>
          ) : (
            <></>
          )}
        </div>

        <div>
          {movies.map((item) => {
            return (
              <div key={item.id}>
                <span>{item.name}</span>
                <button id={item.id} onClick={handleDetails}>
                  Details
                </button>
                <button id={item.id} onClick={handleAdd}>
                  Add
                </button>
                <button id={item.id} onClick={handleRemove}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          {details.id ? (
            <>
              <h3>{details.title}</h3>
              <p>{details.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                alt="movie poster"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
