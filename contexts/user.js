//context structure that stores user data and transactions

import React, { useContext } from "react";
import { setLoginService, setRegisterService } from "../services/authService";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const authLogin = async (email, password) => {
    const res = await setLoginService(email, password);
    return res;
  };

  const authRegister = async (email, password) => {
    const res = await setRegisterService(email, password);
    return res;
  };

  return (
    <UserContext.Provider
      value={{
        authLogin,
        authRegister
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useAuth() {
  return useContext(UserContext);
}

export { UserProvider, UserContext, useAuth };
