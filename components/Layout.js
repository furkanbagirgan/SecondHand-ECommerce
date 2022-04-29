import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import LogoIcon from "../constants/icons/LogoIcon";
import Products from "../components/Products/Products";
import AddIcon from "./../constants/icons/AddIcon";
import UserIcon from "./../constants/icons/UserIcon";
import indexBanner from "../assets/indexBanner.png";
import { useProduct } from "../contexts/product";
import { useEffect } from 'react';

function Layout({ isAuth }) {
  const {categories, filteredProducts, activeCategory, getAllCategories, changeCategory} = useProduct();
  const router = useRouter();

  useEffect(()=>{
    getCategories();
  },[]);

  const getCategories = async()=>{
    await getAllCategories();
  }

  const categoryClick=async(category)=>{
    await changeCategory(category);
    router.push("/?category="+category, undefined, { shallow: true });
  }
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
              <LogoIcon style="logoImg" />
            </div>
            {isAuth ? (
              <div className="navbarButtons">
                <button
                  className="addButton"
                  onClick={() => {
                    router.push("/addProduct");
                  }}
                >
                  <AddIcon style="icon" size="12.9" color="#4b9ce2" />
                </button>
                <button
                  onClick={() => {
                    router.push("/addProduct");
                  }}
                >
                  <AddIcon style="icon" size="12.9" color="#4b9ce2" />
                  Ürün Ekle
                </button>
                <button
                  onClick={() => {
                    router.push("/account");
                  }}
                >
                  <UserIcon
                    style="icon"
                    width="12.4"
                    height="13.1"
                    color="#4b9ce2"
                  />
                  Hesabım
                </button>
              </div>
            ) : (
              <div className="navbarButtons">
                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <UserIcon
                    style="icon"
                    width="12.4"
                    height="13.1"
                    color="#4b9ce2"
                  />
                  Giriş Yap
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="banner">
          <div className="bannerContent">
            <Image
              className="bannerImg"
              src={indexBanner}
              alt="Tarzını yansıtan ürünleri keşfet"
            />
          </div>
        </div>
        <div className="category">
          <div className="categoryContent">
            <span className={activeCategory==="Hepsi" ? "active" : ""} onClick={()=>{categoryClick("Hepsi")}}>Hepsi</span>
            {
              categories?.map((category)=>
                <span key={category.id} className={activeCategory===category.name ? "active" : ""} onClick={()=>{categoryClick(category.name)}}>{category.name}</span>
              )
            }
          </div>
        </div>
        <Products />
      </div>
    </>
  );
}

export default Layout;
