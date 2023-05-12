/**
 * Des: base layout
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useRouter } from "next/router";

// import global components
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <Header path={currentPath} />
      {children}
      <Footer path={currentPath} />
    </div>
  );
};

export default Layout;
