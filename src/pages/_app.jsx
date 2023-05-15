/**
 * Des: root file
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// tailwind styles
import "flowbite/dist/flowbite.css";
import "tailwindcss/tailwind.css";

// global styles
import "@/styles/globals.css";

// context
import { MainContextProvider } from "@/context";

// componets
import Layout from "@/components/layout/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <MainContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainContextProvider>
  );
};

export default App;
