//page that performs api-sided offer operations

import axios, { axiosURL } from "../constants/basicAxios";
import { getCookie } from "../utilies/cookies";

export const setGiveOfferService = async (productId, price) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  const userId = getCookie("authId");
  return await axios
    .post(axiosURL.giveOffer, {
      product: productId,
      offerPrice: price,
      users_permissions_user: userId,
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setDeleteOfferService = async (offerId) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  return await axios
    .delete(axiosURL.deleteOffer + offerId)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setBuyService = async (productId) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  return await axios
    .put(axiosURL.buyProduct + productId, {
      isSold: true,
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setGivenOffersService = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  const userId = getCookie("authId");
  return await axios
    .get(axiosURL.givenOffers + "?users_permissions_user=" + userId)
    .then((res) => {
      return { offers: res.data, status: res.status };
    })
    .catch((err) => {
      return { offers: [], status: err.response.status };
    });
};

export const setReceivedOffersService = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  const userId = getCookie("authId");
  return await axios
    .get(axiosURL.receivedOffers + "?users_permissions_user=" + userId)
    .then((res) => {
      let offers = [];
      res.data.forEach((product) => {
        let productsOffers = product.offers;
        product.offers.forEach((offer, index) => {
          productsOffers[index] = {
            ...offer,
            product: {
              ...offer.product,
              id: product.id,
              name: product.name,
              image: product.image,
              isSold: product.isSold,
            },
          };
        });
        offers = [...offers, ...productsOffers];
      });
      return { offers: offers, status: res.status };
    })
    .catch((err) => {
      return { offers: [], status: err.response.status };
    });
};

export const setOfferAcceptService = async (offerId) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  return await axios
    .put(axiosURL.acceptOffer + offerId, {
      isStatus: true,
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

export const setOfferDeniedService = async (offerId) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "authToken"
  )}`;
  return await axios
    .put(axiosURL.deniedOffer + offerId, {
      isStatus: false,
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};
