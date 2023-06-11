import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [ingredient, setIngredient] = useState([]);

  const addIngredient = (newIngredient) => {
    setIngredient((prevIngredient) => [
      ...prevIngredient,
      { id: Math.random().toString(), ...newIngredient },
    ]);
  };

  const onRemoveGredient = (id) => {
    const updatedImgredients = ingredient.filter((ig) => {
      return ig.id !== id;
    });
    setIngredient(updatedImgredients);
    console.log(updatedImgredients);
  };

  console.log(ingredient);
  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredient}
          onRemoveGredient={onRemoveGredient}
        />
      </section>
    </div>
  );
}

export default Ingredients;
