import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const inputRef = useRef();
  const [searched, setSearched] = useState("");
  const { onLoadINgredients } = props;

  const asyncFunc = async () => {
    if (searched === inputRef.current.value) {
      const query =
        searched.length === 0 ? "" : `?orderBy="title"&equalTo="${searched}"`;
      const response = await fetch(
        "https://ingredients-reactjs-default-rtdb.firebaseio.com/ingredients.json" +
          query
      );
      if (!response.ok) {
        throw new Error("somthing went wrong");
      }
      try {
        const data = await response.json();
        const updatedIngredients = Object.entries(data).map(([key, value]) => {
          return {
            id: key,
            title: value.title,
            amount: value.amount,
          };
        });
        console.log(updatedIngredients);
        props.onLoadINgredients(updatedIngredients);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      asyncFunc();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searched, onLoadINgredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
