import React, {useEffect} from "react";
import Image from "next/image"
import authImg from "../assets/authImg.png"

function Login() {
  

  useEffect(()=>{
    
  },[]);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <div className="main-login">
      <div className="auth-container">
        <Image className="auth-img" src={authImg} alt="Login to ikinciel"/>
      </div>
      <div className="login-container">
        <div className="login"></div>
      </div>
    </div>
  );
}

export default Login;