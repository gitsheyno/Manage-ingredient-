import React, { useContext } from "react";
import Auth from "../src/components/Auth";
import { AuthContext } from "./components/context/context";
import Ingredients from "./components/Ingredients/Ingredients";

const App = (props) => {
  const ctx = useContext(AuthContext);
  let content = <Auth Login={ctx.loginHandler} />;
  if (ctx.isAuthinticated) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
