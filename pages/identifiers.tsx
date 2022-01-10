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
import { ContractContext } from "../state/contract";
import { is256BitHex } from "../utils/crypto";

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const Identifiers: NextPage = () => {
  const router = useRouter();
  const [txIDError, setTxID] = useState<boolean>(false);
  const [recordLocationError, setRecordLocationError] = useState<boolean>(
    false
  );
  const {
    getRecord,
    newRecord,
    recordLocation: rLocation,
  } = useContext(ContractContext);

  useEffect(() => {
    let { txID, recordLocation } = router.query;
    if (txID instanceof Array) setTxID(true);
    else setTxID(!is256BitHex(txID));
    if (recordLocation instanceof Array) setRecordLocationError(true);
    else setRecordLocationError(!recordLocation);
  }, [router.query]);

  function onChangetxID(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let txID: string = e.target.value;
    if (txID === undefined || txID === null || txID.length === 0) {
      router.replace({
        pathname: router.pathname,
        query: recordLocationString
          ? { recordLocation: recordLocationString }
          : {},
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, txID: txID },
      });
  }

  function onChangeRecordLocation(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let recordLocation: string = e.target.value;
    setRecordLocationError(!recordLocation);
    if (
      recordLocation === undefined ||
      recordLocation === null ||
      recordLocation.length === 0
    ) {
      router.replace({
        pathname: router.pathname,
        query: txIDString ? { txID: txIDString } : {},
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, recordLocation: recordLocation },
      });
  }

  const { txID, recordLocation } = router.query;
  const txIDString: string = !txID || txID instanceof Array ? "" : txID;
  const recordLocationString: string =
    !recordLocation || recordLocation instanceof Array ? "" : recordLocation;
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
        {rLocation && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={rLocation}
            variant="h6"
            sx={{
              marginBottom: "20px",
            }}
          >
            {rLocation.substring(0, 70)} {rLocation.length >= 70 && `...`}
          </Link>
        )}
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="txID"
          required
          fullWidth
          value={txIDString}
          onChange={onChangetxID}
          id="fullWidth"
          error={txIDError}
          helperText="The txID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link href="/tools">Calculate my txID</Link>
        </Typography>
        <StyledTextField
          label="Record Location"
          fullWidth
          value={recordLocationString}
          onChange={onChangeRecordLocation}
          id="fullWidth"
          error={recordLocationError}
          helperText="The location of the encrypted record"
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://daniel-nugent.gitbook.io/the-privacy-protocol/guides/usage-pattern#storing-a-new-record"
          >
            How do I encrypt it?
          </Link>
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            disabled={txIDError}
            size="large"
            variant="contained"
            onClick={() => getRecord(txIDString)}
          >
            Retrieve Record
          </Button>
          <Button
            disabled={txIDError || recordLocationError}
            size="large"
            variant="contained"
            onClick={() => newRecord(txIDString, recordLocationString)}
          >
            New Identifier
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Identifiers;
