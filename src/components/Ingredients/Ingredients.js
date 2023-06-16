import React, { useReducer, useState, useCallback } from "react";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const ingredientReducer = (currentIngredient, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredient, action.ingredients];
    case "DELETE":
      return currentIngredient.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("should not reach there");
  }
};

const httpReducer = (currentHttp, action) => {
  switch (action.type) {
    case "ISLOADING":
      return { ...currentHttp, isLoading: action.value };
    case "ERROR":
      return { ...currentHttp, error: action.value };
    default:
      throw new Error("Should not reach here");
  }
};
function Ingredients() {
  const [ingredient, dispatch] = useReducer(ingredientReducer, []);
  const [http, dispatchHttp] = useReducer(httpReducer, {
    error: null,
    isLoading: false,
  });

  const onLoadINgredients = useCallback((newIngredients) => {
    dispatch({ type: "SET", ingredients: newIngredients });
  }, []);

  const addIngredient = async (newIngredient) => {
    dispatchHttp({ type: "ISLOADING", value: true });
    dispatchHttp({ type: "ERROR", value: null });

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

    if (!response.ok) {
      console.log("s");
      throw new Error("somthing went wrong");
    }

    try {
      const responseData = await response.json();
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000); // Delay for one second (1000 milliseconds)
      });

      dispatch({
        type: "ADD",
        ingredients: { id: responseData.name, ...newIngredient },
      });
    } catch (err) {
      console.log("ERROR");
    } finally {
      // setIsLoading(false);
      dispatchHttp({ type: "ISLOADING", value: false });
    }
  };

  const onRemoveGredient = async (id) => {
    const updatedImgredients = ingredient.filter((ig) => {
      return ig.id !== id;
    });

    dispatchHttp({ type: "ISLOADING", value: true });

    const res = await fetch(
      "https://ingredients-reactjs-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "PUT",
        body: JSON.stringify(updatedImgredients),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    dispatch({
      type: "DELETE",
      id,
    });

    dispatchHttp({ type: "ISLOADING", value: false });
  };

  return (
    <div className="App">
      {http.error && <ErrorModal>{http.error}</ErrorModal>}
      <IngredientForm
        addIngredient={addIngredient}
        loading={http.isLoading}
        error={http.error}
      />
      <section>
        <Search onLoadINgredients={onLoadINgredients} />
        <IngredientList
          ingredient={ingredient}
          onRemoveGredient={onRemoveGredient}
        />
      </section>
    </div>
  );
}

export default Ingredients;
