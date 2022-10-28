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
import LogIn from "./LogIn";

const Main = () => {
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [userFavourites, setUserFavourites] = useState({});

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

    switch (searchSelect) {
      case "Movies":
        console.log("search", search);
        console.log("searchSelect", searchSelect);
        axios
          .get(`/api/movies/search/${search}`)
          .then((res) => {
            console.log(res);
            dispatch(newList(res.data));
          })
          .catch((err) => console.log(err));
        break;
      case "TV Shows":
        axios
          .get(`/api/shows/search/${search}`)
          .then((res) => dispatch(newList(res.data)))
          .catch((err) => console.log(err));
        break;
      case "Users":
        axios
          .get(`/api/user/search/${search}`)
          .then((res) => setUsers(res.data))
          .catch((err) => console.log(err));
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  };
  return (
    <>
      <h1>The Movie Database</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-item btn" to={`/movies`}>
            Movies
          </Link>
          <Link className="nav-item btn" to={`/shows`}>
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
            {user.name ? (
              <div>
                <h6>{user.name}</h6>

                <button className="nav-item btn" onClick={handleLogOut}>
                  LogOut!
                </button>
                <button className="nav-item btn" onClick={handleFavourites}>
                  Favourites
                </button>
              </div>
            ) : (
              <>
                <Link className="nav-item btn" to={`/login`}>
                  logIn
                </Link>
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
          <Route path="/login" element={<LogIn />}></Route>
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
        <ListMovies />
        <div>
          {favourites.map((item) => {
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
