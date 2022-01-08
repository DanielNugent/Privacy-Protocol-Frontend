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

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const Transactions: NextPage = () => {
  const router = useRouter();
  const { getAllTransactions, newTransaction, usersTransactions } =
    useContext(ContractContext);
  const [publicIDError, setPublicIDError] = useState<boolean>(false);
  const [hashOfRecordError, setHashOfRecordError] = useState<boolean>(false);

  useEffect(() => {
    let { publicID, hashOfRecord } = router.query;
    if (publicID instanceof Array) setPublicIDError(true);
    else setPublicIDError(!is256BitHex(publicID));
    if (hashOfRecord instanceof Array) setHashOfRecordError(true);
    else setHashOfRecordError(!is256BitHex(hashOfRecord));
  }, [router.query]);

  function onChangePublicID(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let publicID: string = e.target.value;
    if (publicID === undefined || publicID === null || publicID.length === 0) {
      router.replace({
        pathname: router.pathname,
        query: hashOfRecordString ? { hashOfRecord: hashOfRecordString } : {},
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, publicID: publicID },
      });
  }

  function onChangeHashOfRecord(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let hashOfRecord: string = e.target.value;
    if (
      hashOfRecord === undefined ||
      hashOfRecord === null ||
      hashOfRecord.length === 0
    ) {
      router.replace({
        pathname: router.pathname,
        query: publicIDString ? { publicID: publicIDString } : {},
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, hashOfRecord: hashOfRecord },
      });
  }

  const { publicID, hashOfRecord } = router.query;
  const publicIDString: string =
    !publicID || publicID instanceof Array ? "" : publicID;
  const hashOfRecordString: string =
    !hashOfRecord || hashOfRecord instanceof Array ? "" : hashOfRecord;
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
        <CustomTable table="transactions" data={usersTransactions || []} />
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="PublicID"
          required
          fullWidth
          value={publicIDString}
          onChange={onChangePublicID}
          id="fullWidth"
          error={publicIDError}
          helperText="The PublicID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link href="/tools">Calculate my PublicID</Link>
        </Typography>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="Hash of record"
          fullWidth
          value={hashOfRecordString}
          onChange={onChangeHashOfRecord}
          id="fullWidth"
          error={hashOfRecordError}
          helperText="The hash of the record should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link href="/tools">Get a hash of my record</Link>
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            disabled={publicIDError}
            size="large"
            variant="contained"
            onClick={() => getAllTransactions(publicIDString)}
          >
            Find Transactions
          </Button>
          <Button
            disabled={publicIDError || hashOfRecordError}
            size="large"
            variant="contained"
            onClick={() => newTransaction(publicIDString, hashOfRecordString)}
          >
            New Transaction
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Transactions;
