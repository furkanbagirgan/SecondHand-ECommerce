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

export const setProductService = async (categoryId,start) => {
  if(categoryId && categoryId !== 0){
    return await axios
    .get(axiosURL.product+"?_limit=15&_start="+start+"&category="+String(categoryId))
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
  }
  else{
    return await axios
    .get(axiosURL.product)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
  }
};
