import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import { WalletProvider } from "../state/wallet";
import { SnackbarProvider } from "../state/snackbar";
import { ContractProvider } from "../state/contract";
import {ToolsFormProvider} from "../state/toolsformstate";
import { useRouter } from "next/router";
import LandingPage from "../components/landingpage";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <LandingPage />;
  }
  return (
    <Fragment>
      <Head>
        <title>The Privacy Protocol</title>
        <meta
          name="description"
          content="A Decentralized Record Encryption and Indexing System."
        />
        <link rel="icon" href="/lock.ico" />
      </Head>
        <SnackbarProvider>
          <WalletProvider>
            <ContractProvider>
              <ToolsFormProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              </ToolsFormProvider>
            </ContractProvider>
          </WalletProvider>
        </SnackbarProvider>
    </Fragment>
  );
}

export default MyApp;
