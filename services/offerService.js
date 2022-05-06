import axios, { axiosURL } from "../constants/basicAxios";
import { getCookie } from "../utilies/cookies";

export const setGiveOfferService = async (productId, price) => {
  axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie("authToken")}`;
  const userId=getCookie("authId");
  return await axios
    .post(axiosURL.giveOffer, {
      product: productId,
      offerPrice: price,
      users_permissions_user: userId
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setDeleteOfferService = async (offerId) => {
  axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie("authToken")}`;
  return await axios
    .delete(axiosURL.deleteOffer+offerId)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setBuyService = async (productId) => {
  axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie("authToken")}`;
  return await axios
    .put(axiosURL.buyProduct+productId, {
      isSold: true
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};
