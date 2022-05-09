//For axios, the structure it makes to use the specified rules

import axios from "axios";

export const baseURL = "https://bootcamp.akbolat.net";
export default axios.create({ baseURL });

export const axiosURL = {
  login: "/auth/local",
  register: "/auth/local/register",
  category: "/categories",
  product: "/products",
  giveOffer: "/offers",
  deleteOffer: "/offers/",
  buyProduct: "/products/",
  givenOffers: "/offers",
  receivedOffers: "/products/",
  acceptOffer: "/offers/",
  deniedOffer: "/offers/",
  createProduct: "/products",
  colors: "/colors",
  usingStatus: "/using-statuses",
  brands: "/brands",
  imageUpload: "/upload/",
};
