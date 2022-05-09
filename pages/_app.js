//main page for nextjs

import React from "react";
import { ToastContainer } from "react-toastify";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={3000}
        theme="colored"
        className="toastify"
        hideProgressBar
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default MyApp;
