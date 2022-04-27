import Head from "next/head";

import Navbar from "./Header/Navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>İkinci El Project | Anasayfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <Navbar />
        {children}
      </main>
    </>
  );
}

export default Layout;
