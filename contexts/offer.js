import React, { useContext } from "react";
import { setGiveOfferService, setDeleteOfferService, setBuyService } from "../services/offerService";

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

  return (
    <OfferContext.Provider
      value={{
        giveOffer,
        deleteOffer,
        buyProduct
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
