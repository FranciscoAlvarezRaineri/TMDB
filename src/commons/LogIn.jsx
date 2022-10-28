import React, { useState } from "react";
import axios from "axios";
import { logIn } from "../store/reducers/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate("/");
  };
  return (
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
  );
};

export default LogIn;
