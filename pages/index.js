import Link from "next/link";

import Layout from "../components/Layout";

function HomePage() {
    return(
      <Layout>
        <h1>Hello to Next.js!</h1>
        <Link href="/about">
          <a>Hakkımızda</a>
        </Link>
      </Layout>
    );
  }
  
  export default HomePage;