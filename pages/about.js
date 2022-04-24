import Link from "next/link";

import Layout from "../components/Layout";

function AboutPage() {
    return(
      <Layout>
        <h1>Hello to Next.js!</h1>
        <Link href="/">
          <a>Anasayfa</a>
        </Link>
      </Layout>
    );
  }
  
  export default AboutPage;