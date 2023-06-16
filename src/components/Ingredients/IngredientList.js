import React, { useEffect, useState } from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const response = await fetch(
  //       "https://ingredients-reactjs-default-rtdb.firebaseio.com/ingredients.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("somthing went wrong");
  //     }
  //     try {
  //       const data = await response.json();
  //       const updatedIngredients = Object.entries(data).map(([key, value]) => {
  //         return {
  //           id: key,
  //           title: value.title,
  //           amount: value.amount,
  //         };
  //       });
  //       console.log(updatedIngredients);
  //       props.setIngredient(updatedIngredients);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   asyncFunc();
  // }, []);

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>

      {props.ingredient &&
        Object.entries(props.ingredient).map(([key, value]) => {
          <li key={key} onClick={(e) => props.onRemoveGredient(key)}>
            <span>{value.title}</span>
            <span>{value.amount}x</span>
          </li>;
        })}
      {props.ingredient && (
        <ul>
          {props.ingredient.map((ig) => (
            <li key={ig.id} onClick={(e) => props.onRemoveGredient(ig.id)}>
              <span>{ig.title}</span>
              <span>{ig.amount}x</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default IngredientList;
