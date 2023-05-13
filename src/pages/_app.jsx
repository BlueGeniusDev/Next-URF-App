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
import { AppStore } from "@/context";

// componets
import Layout from "@/components/layout/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <AppStore>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppStore>
  );
};

export default App;
