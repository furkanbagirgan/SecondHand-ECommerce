import { useEffect,useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import LogoIcon from "../constants/icons/LogoIcon";
import Products from "../components/Products/Products";
import AddIcon from "./../constants/icons/AddIcon";
import UserIcon from "./../constants/icons/UserIcon";
import indexBanner from "../assets/indexBanner.png";
import errorImg from "./../assets/errorImg.png";
import { useProduct } from "../contexts/product";

function Layout({ isAuth }) {
  const [showError,setShowError] = useState(false);
  const {categories, filteredProducts, activeCategory, getAllCategories, changeCategory} = useProduct();
  const router = useRouter();

  useEffect(()=>{
    getCategories();
  },[]);

  const getCategories = async()=>{
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
  }

  const categoryClick=async(categoryName,categoryId)=>{
    const res=await changeCategory(categoryName,categoryId);
    if(res!==1){
      setShowError(true);
    }else{
      setShowError(false);
    }
    router.push("/?category="+categoryName, undefined, { shallow: true });
  }

  const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f2f2" offset="30%" />
          <stop stop-color="#f2f2f2" offset="40%" />
          <stop stop-color="#f2f2f2" offset="50%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#fff" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

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
                Bir Şeyler Ters Gitti!
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
            <div className="product">
              <ul className="productContent">
                {
                  /* Here the characters are printed on the screen. */
                  filteredProducts?.length >0 ?
                  filteredProducts?.map((product) => (
                      <li key={product.id} className="productItem" onClick={()=>router.push("/productDetail/"+product.id)}>
                        <Image
                          className="productImg"
                          src={
                            "https://bootcamp.akbolat.net"+
                            product.image.url
                          }
                          alt={product.name}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(260, 297))}`}
                          width= "280"
                          height= "397"
                        />
                        <div className="productDetail">
                          <span className="productBrand">{product.brand}</span>
                          <span className="productColor">{"Renk: "+product.color}</span>
                        </div>
                        <div className="productPrice">{product.price+",00 TL"}</div>
                      </li>
                  )) :
                  <div className="productNotFound">Bu kategoride hiçbir ürün bulunmamaktadır.</div>
                }
              </ul>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default Layout;
