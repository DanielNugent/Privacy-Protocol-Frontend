import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import LandingPage from "../components/landingpage";
import CombinedProviders from "../state/index";
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
      <CombinedProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CombinedProviders>
    </Fragment>
  );
}

export default MyApp;
