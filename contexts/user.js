import React, { useState,useContext } from "react";
import { setLoginService, setRegisterService } from "../services/authService";

const UserContext = React.createContext();

let userInfo={};
const UserProvider = ({ children }) => {
  const [user,setUser] = useState(userInfo);

  const authLogin = async (email, password) => {
    const res = await setLoginService(email, password);
    userInfo=res.user;
    return res.status;
  };

  const authRegister = async (email, password) => {
    const res = await setRegisterService(email, password);
    setUser(res.user);
    return res.status;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authLogin,
        authRegister,
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
