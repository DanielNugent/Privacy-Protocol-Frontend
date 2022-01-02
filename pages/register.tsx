import React, { Fragment, useState, useContext } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import useContractData from "../state/contractdata";
import HashOfScansTable from "../components/hashofscantable";
import { WalletContext } from "../state/wallet";

const ScanInput = styled(TextField)`
  margin-bottom: 20px;
`;
/*
{similarity(
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd",
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd"
)}*/
const Register: NextPage = () => {
  const [hashOfScan, setHashOfScan] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const { getSimilarHashOfScans, registerHoS, contractState } =
    useContractData();
  const { defaultAccount } = useContext(WalletContext);
  function onChangeHoS(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let HoS: string = e.target.value;
    setError(
      Boolean((HoS && !(HoS && HoS.match(/^[0-9a-f]+$/i))) || HoS.length !== 64)
    );
    setHashOfScan(e.target.value);
  }

  return (
    <Fragment>
      {contractState.similarScans && contractState.similarScans.length > 0 && (
        <HashOfScansTable data={contractState.similarScans} />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 180px)",
        }}
      >
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
          error={error}
          helperText="The Hash of the Scan should be a 256 bit string in Hexadecimal format"
          onChange={onChangeHoS}
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.google.com"
          >
            How do I get a hash of my Iris Scan?
          </Link>
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => registerHoS(hashOfScan, defaultAccount)}
            disabled={error}
            size="large"
            variant="contained"
          >
            Register
          </Button>
          <Button
            disabled={error}
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
