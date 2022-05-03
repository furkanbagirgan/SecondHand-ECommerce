import Head from "next/head";

import Navbar from "../components/Navbar/Navbar";

function Layout({children}) {
  return (
    <>
      <Head>
        <title>İkinci El Project | Anasayfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="main">
          <Navbar />
          {children}
      </div>
    </>
  );
}

export default Layout;
