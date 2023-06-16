import React, { useState } from "react";

export const AuthContext = React.createContext({});

const AuthContextProvider = (props) => {
  const [isAuthinticated, setIsauthinticated] = useState(false);

  const loginHandler = () => {
    setIsauthinticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ loginHandler: loginHandler, isAuthinticated: isAuthinticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
