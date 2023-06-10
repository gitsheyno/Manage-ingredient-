import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  const [inputs, setInputs] = useState({ title: "", amount: "" });

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputs.title}
              onChange={(e) => {
                const prevTitle = e.target.value;
                setInputs((prevState) => ({
                  title: prevTitle,
                  amount: prevState.amount,
                }));
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputs.amount}
              onChange={(e) => {
                const newAmount = e.target.value;
                setInputs((prevState) => ({
                  title: prevState.title,
                  amount: newAmount,
                }));
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
