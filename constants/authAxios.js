import axios from "axios";

import { getCookie } from "../utilies/cookies";

export default axios.create({
  baseURL: "https://bootcamp.akbolat.net",
  headers: {
    Authorization: `Bearer ${getCookie("authToken")}`,
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export const axiosAuthURL = {
  category: "/categories",
  product: "/products",
};
