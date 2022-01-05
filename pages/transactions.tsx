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
import CustomTable from "../components/customtable";
import { ContractContext } from "../state/contract";
import { is256BitHex } from "../utils/crypto";

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

interface Props {
  initPublicIDError: boolean;
  initHashOfRecordError: boolean;
}

const Transactions: NextPage<Props> = ({
  initPublicIDError,
  initHashOfRecordError,
}) => {
  const [publicIDError, setPublicIDError] =
    useState<boolean>(initPublicIDError);
  const [hashOfRecordError, setHashOfRecordError] = useState<boolean>(
    initHashOfRecordError
  );
  const router = useRouter();
  const { getAllTransactions, newTransaction, usersTransactions } =
    useContext(ContractContext);

  function onChangePublicID(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let publicID: string = e.target.value;
    setPublicIDError(
      Boolean(
        (publicID && !(publicID && publicID.match(/^[0-9a-f]+$/i))) ||
          publicID.length !== 64
      )
    );
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
    setHashOfRecordError(
      Boolean(
        (hashOfRecord &&
          !(hashOfRecord && hashOfRecord.match(/^[0-9a-f]+$/i))) ||
          hashOfRecord.length !== 64
      )
    );
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

Transactions.getInitialProps = ({ query }) => {
  let { publicID, hashOfRecord } = query;
  if (publicID instanceof Array || hashOfRecord instanceof Array)
    return { initPublicIDError: true, initHashOfRecordError: true };
  return {
    initPublicIDError: is256BitHex(publicID),
    initHashOfRecordError: is256BitHex(hashOfRecord),
  };
};

export default Transactions;
