import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTextData } from "./Slices/movieSlice";

const Search = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.movieState.text;
  });
  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(changeTextData({ text:value }));
  };

  return (
    <div className="main-Search-box" style={{ margin: "3rem 0rem" }}>
      <div
        className="search"
        style={{ width: "40rem", height: "3rem", margin: "auto" }}
      >
        <input
          type="text"
          placeholder="Search-any movie"
          style={{
            padding: "0.3rem 1.2rem",
            fontSize: "1.5rem",
            outline: "none",
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
          value={data}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default Search;
