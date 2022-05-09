//component showing layout

import Navbar from "../components/Navbar/Navbar";

function Layout({ children }) {
  return (
    <div className="main">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
