import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { AuthContextProvider } from "../store/auth-context";
import CartProvider from "../store/CartProvider";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </CartProvider>
  );
}

export default MyApp;
