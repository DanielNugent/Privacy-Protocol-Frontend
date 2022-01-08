import React, { Fragment, useState, useContext, useEffect } from "react";
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
import CustomTable from "../components/customtable";
import { ContractContext } from "../state/contract";
import { is256BitHex } from "../utils/crypto";

const ScanInput = styled(TextField)`
  margin-bottom: 20px;
`;

const Register: NextPage = () => {
  const router = useRouter();
  const { getSimilarHashOfScans, registerHoS, similarScans } =
    useContext(ContractContext);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let { userHash } = router.query;
    if (userHash instanceof Array) setError(true);
    else setError(!is256BitHex(userHash));
  }, []);

  function onChangeHoS(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let HoS: string = e.target.value;
    setError(!is256BitHex(HoS));
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
        <CustomTable table="scans" data={similarScans || []} />
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
            href="https://daniel-nugent.gitbook.io/the-privacy-protocol/guides/obtaining-your-iris-scan"
          >
            How do I get a hash of my Iris Scan?
          </Link>
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => registerHoS(userHashString)}
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
  if (userHash instanceof Array) return { initError: true };
  return {
    initError: is256BitHex(userHash),
  };
};

export default Register;
