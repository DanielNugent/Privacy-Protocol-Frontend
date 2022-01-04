import { createContext, useState, forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SnackbarContent from "@mui/material/SnackbarContent";

interface Props {
  children: React.ReactNode;
}

type Direction = "horizontal" | "vertical";

interface ISnackbar {
  openErrorSnackbar: (msg: string, txHash: string) => void;
  openSuccessSnackbar: (msg: string, txHash: string) => void;
  openLoadingSnackbar: (message: string) => void;
}

const Alert = forwardRef<any, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransactionAction = (txHash: string) => (
  <Button
    component={Link}
    target="_blank"
    href={`https://rinkeby.etherscan.io/tx/${txHash}`}
    rel="noopener noreferrer"
    color="inherit"
    size="small"
  >
    View Transaction
  </Button>
);

export const SnackbarContext = createContext<ISnackbar>({
  openErrorSnackbar: () => {},
  openSuccessSnackbar: () => {},
  openLoadingSnackbar: () => {},
});

export function SnackbarProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [type, setType] = useState<string>("info");
  const [txHash, setTxHash] = useState<string>("");

  const openErrorSnackbar = (msg: string, txHash: string) => {
    setMessage(msg);
    setType("error");
    setOpen(true);
    setOpenLoading(false);
    setTxHash(txHash);
  };
  const openSuccessSnackbar = (msg: string, txHash: string) => {
    setMessage(msg);
    setType("success");
    setOpen(true);
    setOpenLoading(false);
    setTxHash(txHash);
  };
  const openLoadingSnackbar = (msg: string) => {
    setLoadingMessage(msg);
    setOpenLoading(true);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseLoading = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenLoading(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ openErrorSnackbar, openSuccessSnackbar, openLoadingSnackbar }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openLoading}
        onClose={handleClose}
        sx={{ marginTop: "50px", marginRight: "8px" }}
        key={"top" + "right"}
      >
        <Alert
          onClose={handleCloseLoading}
          severity="info"
          sx={{ width: "100%" }}
        >
          {loadingMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={"bottom" + "left"}
      >
        <Alert
          onClose={handleClose}
          action={txHash && TransactionAction(txHash)}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}
