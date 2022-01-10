import React, { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import CustomTable from "../components/customtable";
import { ContractContext } from "../state/contract";
import { TransactionContext } from "../state/transactionstate";

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const Transactions: NextPage = () => {
  const { getAllTransactions, newTransaction, usersTransactions } =
    useContext(ContractContext);
  const { formState, onChangePublicID, onChangeHashOfRecord } =
    useContext(TransactionContext);

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
          value={formState.publicID}
          onChange={onChangePublicID}
          id="fullWidth"
          error={formState.publicIDError}
          helperText="The PublicID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <NextLink href="/tools" passHref>
          <Link style={{ marginBottom: 10 }}>Calculate my PublicID</Link>
        </NextLink>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="Hash of record"
          fullWidth
          value={formState.hashOfRecord}
          onChange={onChangeHashOfRecord}
          id="fullWidth"
          error={formState.hashOfRecordError}
          helperText="The hash of the record should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <NextLink href="/encrypt" passHref>
          <Link style={{ marginBottom: 10 }}>Get a hash of my record</Link>
        </NextLink>
        <Stack direction="row" spacing={4}>
          <Button
            disabled={formState.publicIDError}
            size="large"
            variant="contained"
            onClick={() => getAllTransactions(formState.publicID)}
          >
            Find Transactions
          </Button>
          <Button
            disabled={formState.publicIDError || formState.hashOfRecordError}
            size="large"
            variant="contained"
            onClick={() =>
              newTransaction(formState.publicID, formState.hashOfRecord)
            }
          >
            New Transaction
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Transactions;
