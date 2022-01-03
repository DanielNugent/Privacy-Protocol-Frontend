import { createContext, useState, forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface Props {
  children: React.ReactNode;
}

interface ISnackbar {
  openErrorSnackbar: (message: string) => void;
  openSuccessSnackbar: (message: string) => void;
  openLoadingSnackbar: (message: string) => void;
}

const Alert = forwardRef<any, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarContext = createContext<ISnackbar>({
  openErrorSnackbar: () => {},
  openSuccessSnackbar: () => {},
  openLoadingSnackbar: () => {},
});

export function SnackbarProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("info");

  const openErrorSnackbar = (msg: string) => {
    setMessage(msg);
    setType("error");
    setOpen(true);
  };
  const openSuccessSnackbar = (msg: string) => {
    setMessage(msg);
    setType("success");
    setOpen(true);
  };
  const openLoadingSnackbar = (msg: string) => {
    setMessage(msg);
    setType("info");
    setOpen(true);
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

  return (
    <SnackbarContext.Provider
      value={{ openErrorSnackbar, openSuccessSnackbar, openLoadingSnackbar }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}
