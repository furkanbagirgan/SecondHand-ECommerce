import Layout from "../components/Layout";
import Products from "../components/Products/Products";
import { ProductsProvider } from "../contexts/products";

function HomePage() {
  return (
    <Layout>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </Layout>
  );
}

export default HomePage;
