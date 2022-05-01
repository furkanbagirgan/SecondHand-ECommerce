import { useEffect,useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import LogoIcon from "../constants/icons/LogoIcon";
import AddIcon from "./../constants/icons/AddIcon";
import UserIcon from "./../constants/icons/UserIcon";
import indexBanner from "../public/indexBanner.png";
import errorImg from "./../public/errorImg.png";
import { useProduct } from "../contexts/product";
import LoadingIcon from './../constants/icons/LoadingIcon';

function Layout({ isAuth }) {
  const [loading,setLoading] = useState(false);
  const [showError,setShowError] = useState(false);
  const {categories, filteredProducts, activeCategory, getAllCategories, changeCategory} = useProduct();
  const router = useRouter();

  useEffect(()=>{
    getCategories();
  },[]);

  const getCategories = async()=>{
    setLoading(true);
    if(router.asPath!=="/"){
      const ctName=router.asPath.split("=");
      const res=await getAllCategories(decodeURI(ctName[1]));
      if(res!==1){
        setShowError(true);
      }else{
        setShowError(false);
      }
    }
    else{
      const res=await getAllCategories();
      if(res!==1){
        setShowError(true);
      }else{
        setShowError(false);
      }
    }
    const chcat=await changeCategory("Hepsi",0);
    if(chcat!==1){
      setShowError(true);
    }else{
      setShowError(false);
    }
    setLoading(false);
  }

  const categoryClick=async(categoryName,categoryId)=>{
    setLoading(true);
    const res=await changeCategory(categoryName,categoryId);
    if(res!==1){
      setShowError(true);
    }else{
      setShowError(false);
    }
    router.push("/?category="+categoryName, undefined, { shallow: true });
    setLoading(false);
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
          {
            showError 
            ? 
            <>
              <div className="error">
                <div className="errorContent">
                  <Image
                    className="errorImg"
                    src={errorImg}
                    alt="Hata"
                  />
                </div>
                <div className="errorMessage">
                  Lütfen bağlantınızı kontrol ediniz!
                </div>
              </div>
            </>
            :
            <>
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
                  <span className={activeCategory==="Hepsi" ? "active" : ""} onClick={()=>{categoryClick("Hepsi",0)}}>Hepsi</span>
                  {
                    categories?.map((category)=>
                      <span key={category.id} className={activeCategory===category.name ? "active" : ""} onClick={()=>{categoryClick(category.name,category.id)}}>{category.name}</span>
                    )
                  }
                </div>
              </div>
              {
                loading ?
                <div className="loadingProduct">
                  <LoadingIcon size={75} color="#4b9ce2"/>
                </div> :
                <div className="product">
                  { 
                    filteredProducts?.length >0 ?
                    <ul className="productContainer">
                      {
                        /* Here the characters are printed on the screen. */
                        filteredProducts?.map((product) => (
                            <li key={product.id} className="productItem" onClick={()=>router.push("/productDetail/"+product.id)}>
                              <div className="productImg">
                                {product.image?.url?
                                  <img
                                    className="productPhoto"
                                    src={
                                      product.image?.url?
                                      "https://bootcamp.akbolat.net"+
                                      product.image.url : "noPhoto.png"
                                    }
                                    alt={product.name? product.name : "Adlandırılmamış"}
                                  /> :
                                  <img
                                    className="noPhoto"
                                    src="noPhoto.png"
                                    alt="Fotoğraf Yok"
                                  />
                                }
                              </div>
                              <div className="productContent">
                                <div className="productDetail">
                                  <span className="productBrand">{product.brand? product.brand : "Tanımlanmamış"}</span>
                                  <span className="productColor">{product.color? "Renk: "+product.color :"Renk: Tanımlanmamış"}</span>
                                </div>
                                <div className="productPrice">{product.price? product.price+",00 TL" : "Belirtilmemiş"}</div>
                              </div>
                            </li>
                        ))
                      }
                    </ul> :
                    <div className="productNotFound">Bu kategoride hiçbir ürün bulunmamaktadır.</div>
                  }
                </div>
              }
            </>
          }
        </div>
    </>
  );
}

export default Layout;
