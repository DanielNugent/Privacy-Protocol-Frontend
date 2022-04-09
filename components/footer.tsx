import React, { ReactElement } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import Link from "@mui/material/Link";

export default function Footer(): ReactElement {
  return (
    <div>
      <Stack
        direction="row"
        spacing={12}
        sx={{ justifyContent: "center", marginTop: "50px" }}
      >
        <IconButton
          component={Link}
          href="https://github.com/DanielNugent/Privacy-Protocol-Frontend"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="github"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href="https://docs.theprivacyprotocol.xyz//"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="docs"
        >
          <MenuBookIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
