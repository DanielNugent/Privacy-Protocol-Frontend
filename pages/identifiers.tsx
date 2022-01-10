import React, { Fragment, useContext } from "react";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import { ContractContext } from "../state/contract";
import { IdentifierContext } from "../state/identifierstate";

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const Identifiers: NextPage = () => {
  const {
    getRecord,
    newRecord,
    recordLocation: rLocation,
  } = useContext(ContractContext);
  const { formState, onChangeTxID, onChangeRecordLocation } =
    useContext(IdentifierContext);

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
          value={formState.txID}
          onChange={onChangeTxID}
          id="fullWidth"
          error={formState.txIDError}
          helperText="The txID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <NextLink href="/tools" passHref>
          <Link style={{ marginBottom: 10 }}>Calculate my txID</Link>
        </NextLink>
        <StyledTextField
          label="Record Location"
          fullWidth
          value={formState.recordLocation}
          onChange={onChangeRecordLocation}
          id="fullWidth"
          error={formState.recordLocationError}
          helperText="The location of the encrypted record"
        />

        <NextLink
          href="https://daniel-nugent.gitbook.io/the-privacy-protocol/guides/usage-pattern#storing-a-new-record"
          passHref
        >
          <Link
            rel="noopener noreferrer"
            target="_blank"
            style={{ marginBottom: 10 }}
          >
            How do I encrypt it?
          </Link>
        </NextLink>
        <Stack direction="row" spacing={4}>
          <Button
            disabled={formState.txIDError}
            size="large"
            variant="contained"
            onClick={() => getRecord(formState.txID)}
          >
            Retrieve Record
          </Button>
          <Button
            disabled={formState.txIDError || formState.recordLocationError}
            size="large"
            variant="contained"
            onClick={() => newRecord(formState.txID, formState.recordLocation)}
          >
            New Identifier
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Identifiers;
