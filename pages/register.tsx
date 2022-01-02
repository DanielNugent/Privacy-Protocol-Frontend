import React, { Fragment, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { similarity } from "../utils/index";


const ScanInput = styled(TextField)`
margin-bottom: 20px;
`
interface Props {}
/*
{similarity(
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd",
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd"
)}*/
const Register: NextPage = () => {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)"
        }}
      >
        <ScanInput fullWidth label="Hash of Scan" id="fullWidth" />
        <Stack direction="row" spacing={4} >
          <Button size="large" variant="contained">Register</Button>
          <Button size="large" variant="contained">Search</Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Register;
