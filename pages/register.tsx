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
import { ContractContext } from "../state/contract";
import HashOfScansTable from "../components/hashofscantable";
import { WalletContext } from "../state/wallet";

const ScanInput = styled(TextField)`
  margin-bottom: 20px;
`;

interface Props {
  initError: boolean;
}
/*
{similarity(
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd",
  "0x0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fd"
)}*/
const Register: NextPage<Props> = ({ initError }) => {
  const [error, setError] = useState<boolean>(initError);
  const router = useRouter();
  const { getSimilarHashOfScans, registerHoS, similarScans, searched } =
    useContext(ContractContext);
  const { defaultAccount } = useContext(WalletContext);

  function onChangeHoS(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let HoS: string = e.target.value;
    setError(
      Boolean((HoS && !(HoS && HoS.match(/^[0-9a-f]+$/i))) || HoS.length !== 64)
    );
    if (HoS === undefined || HoS === null || HoS.length === 0) {
      router.replace({
        pathname: router.pathname,
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { userHash: HoS },
      });
  }
  const { userHash } = router.query;
  const userHashString: string =
    !userHash || userHash instanceof Array ? "" : userHash;
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
        <div style={{flexGrow: 10}}>
        <HashOfScansTable  data={similarScans || []} />
        </div>
        <ScanInput
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          fullWidth
          value={userHash ? userHash : ""}
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
            onClick={() => registerHoS(userHashString, defaultAccount)}
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
            onClick={() => getSimilarHashOfScans(userHashString)}
          >
            Search
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

Register.getInitialProps = ({ query }) => {
  let { userHash } = query;
  console.log("" === null);
  if (userHash === undefined || !userHash || userHash instanceof Array)
    return { initError: false };
  return {
    initError: Boolean(
      !(userHash && userHash.match(/^[0-9a-f]+$/i)) || userHash.length !== 64
    ),
  };
};

export default Register;
