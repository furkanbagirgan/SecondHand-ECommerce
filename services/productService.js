import axios, { axiosAuthURL } from "../constants/authAxios";

export const seCategoryService = async () => {
  return await axios
    .get(axiosURL.category)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setProductService = async () => {
  return await axios
    .post(axiosURL.product, {
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
