import React, { useEffect, useState } from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await fetch(
        "https://ingredients-reactjs-default-rtdb.firebaseio.com/ingredients.json"
      );
      if (!response.ok) {
        throw new Error("somthing went wrong");
      }
      try {
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    asyncFunc();
  }, [props]);

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      {data && (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key} onClick={(e) => props.onRemoveGredient(key)}>
              <span>{value.title}</span>
              <span>{value.amount}x</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default IngredientList;
