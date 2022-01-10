import React, { Fragment, useContext } from "react";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import CustomTable from "../components/customtable";
import { ContractContext } from "../state/contract";
import { RegisterContext } from "../state/registerstate";

const ScanInput = styled(TextField)`
  margin-bottom: 20px;
`;

const Register: NextPage = () => {
  const { getSimilarHashOfScans, registerHoS, similarScans } =
    useContext(ContractContext);
  const { hashOfScan, hashOfScanError, onChangeHashOfScan } = useContext(RegisterContext);


  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 180px)",
        }}
      >
        <CustomTable table="scans" data={similarScans || []} />
        <ScanInput
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          fullWidth
          value={hashOfScan}
          label="Hash of Scan"
          required
          id="fullWidth"
          error={hashOfScanError}
          helperText="The Hash of the Scan should be a 256 bit string in Hexadecimal format"
          onChange={onChangeHashOfScan}
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <NextLink
            passHref
            href="https://daniel-nugent.gitbook.io/the-privacy-protocol/guides/obtaining-your-iris-scan"
          >
            <Link rel="noopener noreferrer" target="_blank">
              How do I get a hash of my Iris Scan?
            </Link>
          </NextLink>
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => registerHoS(hashOfScan)}
            disabled={hashOfScanError}
            size="large"
            variant="contained"
          >
            Register
          </Button>
          <Button
            disabled={hashOfScanError}
            size="large"
            variant="contained"
            onClick={() => getSimilarHashOfScans(hashOfScan)}
          >
            Search
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Register;
