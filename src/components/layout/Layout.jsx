/**
 * Des: base layout
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useEffect } from "react";
import { useRouter } from "next/router";

// import global components
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  // global states
  const navigator = useRouter();
  const currentPath = navigator.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <Header path={currentPath} />
      {children}
      <Footer path={currentPath} />
    </div>
  );
};

export default Layout;
