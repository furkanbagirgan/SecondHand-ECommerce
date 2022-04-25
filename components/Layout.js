import Link from "next/link";
import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>İkinci El Project | Anasayfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
    </>
  );
}

export default Layout;
