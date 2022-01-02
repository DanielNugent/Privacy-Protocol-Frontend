import React, { useContext, ReactElement } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { WalletContext } from "../pages/state/wallet";
import Avatar from "@mui/material/Avatar";

interface Props {}

export default function WalletModal(): ReactElement {
  const {
    walletModalOpen,
    closeWalletModal,
    defaultAccount: walletAddress,
  } = useContext(WalletContext);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={walletModalOpen}
      onClose={closeWalletModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={walletModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid #000",
            borderRadius: "2%",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Container maxWidth="sm">
            <Button
              variant="contained"
              size="large"
              startIcon={
                <Avatar sx={{ width: 24, height: 24 }} src="/metamask.png" />
              }
            >
              {walletAddress && walletAddress}
            </Button>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
