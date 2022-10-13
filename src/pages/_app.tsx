import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default trpc.withTRPC(MyApp);
