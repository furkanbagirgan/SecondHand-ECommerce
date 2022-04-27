import React, { useContext } from "react";
import { setLoginService,setRegisterService } from './../services/authService';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

  const authLogin = async(email,password) => {
    const res= await setLoginService(email,password);
    return res;
  };

  const authRegister= async(email,password) => {
    const res= await setRegisterService(email,password);
    return res;
  }

  return (
    <AuthContext.Provider
      value={{
        authLogin,
        authRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, AuthContext, useAuth };
