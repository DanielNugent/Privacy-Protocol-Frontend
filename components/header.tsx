import React, { ReactElement, useContext, useCallback } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { Link as MuiLink } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { WalletContext } from "../state/wallet";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";

const StyledLoadingButton = styled(LoadingButton)`
  min-width: 120px;
`;

const TransparentAppBar = styled(AppBar)`
  background: transparent;
  box-shadow: "none";
`;

export default function Header(): ReactElement {
  const {
    defaultAccount,
    loading: walletLoading,
    errorMessage,
  } = useContext(WalletContext);
  const router = useRouter();
  const getButtonStyle = useCallback(
    (path) => {
      return router.pathname === `/${path}` ? "contained" : "outlined";
    },
    [router]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TransparentAppBar
        position="static"
        color="transparent"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            The Privacy Protocol
          </Typography>
          <Stack direction="row" spacing={4} sx={{ flexGrow: 20 }}>
            <Link href="/register" passHref>
              <Button variant={getButtonStyle("register")}>Register</Button>
            </Link>
            <Link href="/tools" passHref>
              <Button variant={getButtonStyle("tools")}>Tools</Button>
            </Link>
            <Link href="/transactions" passHref>
              <Button variant={getButtonStyle("transactions")}>
                Transactions
              </Button>
            </Link>
            <Link href="/identifiers" passHref>
              <Button variant={getButtonStyle("identifiers")}>
                Identifiers
              </Button>
            </Link>
          </Stack>
          {!walletLoading ? (
            <Button
              variant="contained"
              color={errorMessage ? "error" : "primary"}
              component={MuiLink}
              href={
                !errorMessage &&
                defaultAccount &&
                `https://rinkeby.etherscan.io/address/${defaultAccount}`
              }
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <Avatar sx={{ width: 24, height: 24 }} src="/metamask.png" />
              }
            >
              {!errorMessage && defaultAccount
                ? defaultAccount.slice(0, 6) +
                  "..." +
                  defaultAccount.slice(defaultAccount.length - 4)
                : errorMessage}
            </Button>
          ) : (
            <StyledLoadingButton
              loading
              loadingPosition="end"
              endIcon={<SaveIcon />}
              variant="outlined"
              color="inherit"
            >
              Loading
            </StyledLoadingButton>
          )}
        </Toolbar>
      </TransparentAppBar>
    </Box>
  );
}
