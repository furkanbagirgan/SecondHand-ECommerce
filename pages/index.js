import Link from "next/link";

import Layout from "../components/Layout";
import Products from "../components/Products/Products";

function HomePage() {
  return (
    <Layout>
      <Products />
    </Layout>
  );
}

export default HomePage;
