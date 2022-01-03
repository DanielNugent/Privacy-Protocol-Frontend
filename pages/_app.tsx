import { useState, useEffect, Fragment } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { WalletProvider } from "../state/wallet";
import { SnackbarProvider } from "../state/snackbar";
import { ContractProvider } from "../state/contract";
import { useRouter } from "next/router";
import LandingPage from "../components/landingpage";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <LandingPage />;
  }
  return (
    <SnackbarProvider>
      <WalletProvider>
        <ContractProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContractProvider>
      </WalletProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
