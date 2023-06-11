import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [ingredient, setIngredient] = useState([]);
  const addIngredient = async (newIngredient) => {
    const response = await fetch(
      "https://ingredients-reactjs-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(newIngredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("somthing went wrong");
    }

    try {
      setIngredient((prevIngredient) => [
        ...prevIngredient,
        { id: responseData.name, ...newIngredient },
      ]);
    } catch (err) {
      console.log(err.message);
    }
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
