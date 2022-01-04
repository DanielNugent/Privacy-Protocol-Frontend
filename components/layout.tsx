import React, { ReactElement, Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Container from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="md">
        {children}
        <Footer />
      </Container>
    </Fragment>
  );
}
