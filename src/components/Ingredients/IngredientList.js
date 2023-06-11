import React from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  props.ingredients.map((ig) => console.log(ig.id));
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          // <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
          <li key={ig.id} onClick={(e) => props.onRemoveGredient(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
