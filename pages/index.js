import Link from "next/link";

import Layout from "../components/Layout";

function HomePage() {
    return(
      <Layout>
        <h1>Hello to İkinciel Project</h1>
        <Link href="/login">
          <a>Giriş Yap</a>
        </Link>
      </Layout>
    );
  }
  
  export default HomePage;