import Head from "next/head";
import { useRouter } from 'next/router'

import Logo from "../constants/icons/Logo";

function Layout({ isAuth,children }) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>İkinci El Project | Anasayfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="main">
        <div className="navbar">
          <div className="navbarContent">
            <div className="logo">
              <Logo style="logoImg"/>
            </div>
            {
              isAuth ? 
              <div className="navbarButtons">
                <button onClick={()=>{router.push("/addProduct")}}>Ürün Ekle</button>
                <button onClick={()=>{router.push("/account")}}>Hesabım</button>
              </div> :
              <div className="navbarButtons">
                <button onClick={()=>{router.push("/login")}}>Giriş Yap</button>
              </div> 
            }
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
