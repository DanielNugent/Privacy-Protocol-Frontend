import React, { ReactElement, Fragment } from "react";
import Header from "./header";
import Container from "@mui/material/Container";
import { WalletContext } from "../pages/state/wallet";
import WalletModal from "./walletmodal";

interface Props {
  children: React.ReactNode;
}



export default function Layout({ children }: Props): ReactElement {
  return (
    <Fragment>
        <Header />
        <WalletModal/>
        <Container maxWidth="md">{children}</Container>
    </Fragment>
  );
}
