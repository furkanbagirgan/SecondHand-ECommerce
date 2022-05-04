import axios, { axiosURL } from "../constants/basicAxios";
import { setCookie } from "../utilies/cookies";

export const setLoginService = async (email, password) => {
  return await axios
    .post(axiosURL.login, {
      identifier: `${email}`,
      password: `${password}`,
    })
    .then((res) => {
      setCookie("authToken", res.data.jwt, 1);
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setRegisterService = async (email, password) => {
  return await axios
    .post(axiosURL.register, {
      username: `${email}`,
      email: `${email}`,
      password: `${password}`,
    })
    .then((res) => {
      setCookie("authToken", res.data.jwt, 1);
      return res.status;
    })
    .catch((err) => {
      if (
        err.response.data.message[0].messages[0].message ===
        "Email is already taken."
      ) {
        return 402;
      } else {
        return 400;
      }
    });
};

export const setCategoryService = async () => {
  return await axios
    .get(axiosURL.category)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setProductsService = async (categoryId,start) => {
  if(categoryId && categoryId !== 0){
    return await axios
    .get(axiosURL.product+"?_limit=15&_start="+start+"&category="+String(categoryId))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
  }
  else{
    return await axios
    .get(axiosURL.product+"?_limit=15&_start="+start)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
  }
};

export const setProductService = async (productId) => {
  if(productId){
    return await axios
    .get(axiosURL.product+"?id="+String(productId))
    .then((res) => {
      return res.data[0];
    })
    .catch((err) => {
      return err.response.status;
    });
  }
  else{
    return 404;
  }
};
