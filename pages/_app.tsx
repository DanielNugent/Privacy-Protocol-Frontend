import { useState, useEffect, Fragment } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { WalletProvider } from "./state/wallet";
import { useRouter } from "next/router";
import LandingPage from "../components/landingpage";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <LandingPage />;
  }
  return (
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}

export default MyApp;
