//page that performs api-sided product operations

import axios, { axiosURL } from "../constants/basicAxios";
import { getCookie } from "../utilies/cookies";

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

export const setProductsService = async (categoryId, start) => {
  if (categoryId && categoryId !== 0) {
    return await axios
      .get(
        axiosURL.product +
          "?_limit=15&_start=" +
          start +
          "&category=" +
          String(categoryId)
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.status;
      });
  } else {
    return await axios
      .get(axiosURL.product + "?_limit=15&_start=" + start)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.status;
      });
  }
};

export const setProductService = async (productId) => {
  if (productId) {
    return await axios
      .get(axiosURL.product + "?id=" + String(productId))
      .then((res) => {
        return res.data[0];
      })
      .catch((err) => {
        return err.response.status;
      });
  } else {
    return 404;
  }
};

export const setCreateProductService = async (product, image) => {
  if (product) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
      "authToken"
    )}`;
    const userId = getCookie("authId");
    const datas = { ...product, users_permissions_user: userId };
    const newProduct = new FormData();
    newProduct.append("data", JSON.stringify(datas));
    newProduct.append("files.image", image);

    return await axios
      .post(axiosURL.createProduct, newProduct)
      .then((res) => {
        return res.status;
      })
      .catch((err) => {
        return err.response.status;
      });
  } else {
    return 404;
  }
};

export const setColorService = async () => {
  return await axios
    .get(axiosURL.colors)
    .then((res) => {
      return { colors: res.data, status: res.status };
    })
    .catch((err) => {
      return { colors: [], status: err.response.status };
    });
};

export const setBrandService = async () => {
  return await axios
    .get(axiosURL.brands)
    .then((res) => {
      return { brands: res.data, status: res.status };
    })
    .catch((err) => {
      return { brands: [], status: err.response.status };
    });
};

export const setUsingStatusService = async () => {
  return await axios
    .get(axiosURL.usingStatus)
    .then((res) => {
      return { usingStatus: res.data, status: res.status };
    })
    .catch((err) => {
      return { usingStatus: [], status: err.response.status };
    });
};
