import axios, { axiosURL } from "../constants/basicAxios";

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

export const setCreateProductService = async (product) => {
  if(product){
    axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie("authToken")}`;

    const data=new FormData();
    for(let key in product){
      data.append(key, product[key]);
    }

    return await axios
    .post(axiosURL.createProduct,data)
    .then((res) => {
      return res.data.status;
    })
    .catch((err) => {
      return err.response.status;
    });
  }
  else{
    return 404;
  }
};
