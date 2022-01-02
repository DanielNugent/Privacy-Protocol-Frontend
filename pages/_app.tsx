import { useState, useEffect, Fragment } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { WalletProvider } from "../state/wallet";
import { SnackbarProvider } from "../state/snackbar";
import { useRouter } from "next/router";
import LandingPage from "../components/landingpage";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <LandingPage />;
  }
  return (
    <WalletProvider>
      <SnackbarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </WalletProvider>
  );
}

export default MyApp;
