import React, { ReactElement, Fragment } from "react";
import styled from "styled-components";
import Head from "next/head";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const BckImg = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover;
  width: 100vw;
  margin: -8px;
  border: 0;
  padding: 0;
`;
const HeroText = styled(Typography)`
  margin-top: 20;
  text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  background-color #aee1f9;
  background-image linear-gradient(315deg, #aee1f9 0%, #f6ebe6 74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  z-index: 1;
`;

const NewTabLink = styled.a`
  text-decoration: none;
`;

function LandingPage(): ReactElement {
  return (
    <Fragment>
      <Head>
        <title>PrivacyProtocol</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BckImg>
        <Image
          alt="Landing"
          src="/landing.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <HeroText variant="h1" gutterBottom align="center">
            The Privacy Protocol
          </HeroText>
          <Stack direction="row" spacing={4}>
            <NewTabLink
              rel="noopener noreferrer"
              href="/register"
              target="_blank"
            >
              <Button size="large" variant="contained">
                Enter App
              </Button>
            </NewTabLink>
            <NewTabLink
              rel="noopener noreferrer"
              href="https://daniel-nugent.gitbook.io/the-privacy-protocol/"
              target="_blank"
            >
              <Button size="large" variant="contained">
                Documentation
              </Button>
            </NewTabLink>
          </Stack>
        </Box>
      </BckImg>
    </Fragment>
  );
}

export default LandingPage;
