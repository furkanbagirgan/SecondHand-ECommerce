//context structure that stores offer data and transactions

import React, { useContext } from "react";
import {
  setGiveOfferService,
  setDeleteOfferService,
  setBuyService,
  setGivenOffersService,
  setReceivedOffersService,
  setOfferAcceptService,
  setOfferDeniedService,
} from "../services/offerService";

const OfferContext = React.createContext();

const OfferProvider = ({ children }) => {
  const giveOffer = async (productId, price) => {
    const res = await setGiveOfferService(productId, price);
    return res;
  };

  const deleteOffer = async (offerId) => {
    const res = await setDeleteOfferService(offerId);
    return res;
  };

  const buyProduct = async (productId) => {
    const res = await setBuyService(productId);
    return res;
  };

  const getGivenOffers = async () => {
    const res = await setGivenOffersService();
    return res;
  };

  const getReceivedOffers = async () => {
    const res = await setReceivedOffersService();
    return res;
  };

  const acceptOffer = async (offerId) => {
    const res = await setOfferAcceptService(offerId);
    return res;
  };

  const deniedOffer = async (offerId) => {
    const res = await setOfferDeniedService(offerId);
    return res;
  };

  return (
    <OfferContext.Provider
      value={{
        giveOffer,
        deleteOffer,
        buyProduct,
        getGivenOffers,
        getReceivedOffers,
        acceptOffer,
        deniedOffer,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

function useOffer() {
  return useContext(OfferContext);
}

export { OfferProvider, OfferContext, useOffer };
