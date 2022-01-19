import * as React from "react";
import { createTheme, ThemeProvider, PaletteOptions, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    palette: Palette
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions 
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

interface Props {
  children: React.ReactNode;
}

export default function Theme({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
