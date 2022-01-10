import React, { Fragment, useContext } from "react";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import CountryAutoComplete from "../components/countryautocomplete";
import {
  HASH_OF_SCAN,
  DATE_OF_BIRTH,
  GENDER,
  PUBLIC_ID,
  PINCODE,
  PRIVATE_ID,
  KEY,
  HASH_OF_RECORD,
  TXID,
} from "../constants/form";
import { ToolsFormContext } from "../state/toolsformstate";

const MarginTextField = styled(TextField)`
  margin-bottom: 7px;
  margin-top: 10px;
`;

const today = new Date();

const Tools: NextPage = () => {
  const {
    formState,
    onChangeField,
    getPublicID,
    getPrivateID,
    getEncryptionKey,
    getTxID,
  } = useContext(ToolsFormContext);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        mt={2}
      >
        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.hashOfScan}
          error={formState.hashOfScanError}
          onChange={(e) => onChangeField(HASH_OF_SCAN, e)}
          label="Hash of the scan"
          fullWidth
          id="hash-of-scan"
          helperText="The hashOfScan should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={12}
          mt={1}
          mb={1}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              maxDate={today}
              value={formState.dateOfBirth}
              onChange={(newDate) =>
                onChangeField(DATE_OF_BIRTH, { target: { value: newDate } })
              }
              label="Date of Birth"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <FormControl style={{ minWidth: 180 }}>
            <InputLabel id="gender-input">Gender</InputLabel>
            <Select
              id="gender-select"
              value={formState.gender}
              onChange={(e) => onChangeField(GENDER, e)}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>
          <CountryAutoComplete />
        </Stack>

        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.publicID}
          error={formState.publicIDError}
          onChange={(e) => onChangeField(PUBLIC_ID, e)}
          label="PublicID"
          fullWidth
          id="public-id"
          helperText="The PublicID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />

        <MarginTextField
          label="Pin code"
          value={formState.pincode}
          error={formState.pincodeError}
          onChange={(e) => onChangeField(PINCODE, e)}
          required
          type="password"
          fullWidth
          id="pincode"
          inputProps={{ maxLength: 64 }}
        />

        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.privateID}
          error={formState.privateIDError}
          onChange={(e) => onChangeField(PRIVATE_ID, e)}
          label="PrivateID"
          fullWidth
          id="private-id"
          helperText="The PrivateID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />

        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.key}
          error={formState.keyError}
          onChange={(e) => onChangeField(KEY, e)}
          label="Encyption/Decryption Key"
          fullWidth
          id="encryption-decryption-key"
          inputProps={{ maxLength: 64, readOnly: true }}
        />

        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.hashOfRecord}
          error={formState.hashOfRecordError}
          onChange={(e) => onChangeField(HASH_OF_RECORD, e)}
          label="Hash of the record"
          fullWidth
          id="hash-of-record"
          helperText="The Hash of the record should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />

        <MarginTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          value={formState.txID}
          error={formState.txIDError}
          onChange={(e) => onChangeField(TXID, e)}
          label="TxID"
          fullWidth
          id="tx-id"
          inputProps={{ maxLength: 64, readOnly: true}}
        />

        <Stack mt={2} direction="row" spacing={4}>
          <Button
            onClick={() => getPublicID()}
            disabled={
              formState.hashOfScanError ||
              formState.dateOfBirthError ||
              formState.genderError ||
              formState.countryOfBirthError
            }
            size="large"
            variant="contained"
          >
            PublicID
          </Button>
          <Button
            onClick={() => getPrivateID()}
            disabled={formState.publicIDError || formState.pincodeError}
            size="large"
            variant="contained"
          >
            PrivateID
          </Button>
          <Button
            onClick={() => getEncryptionKey()}
            disabled={formState.publicIDError || formState.privateIDError}
            size="large"
            variant="contained"
          >
            Encryption Key
          </Button>
          <Button
            onClick={() => getTxID()}
            disabled={
              formState.publicIDError ||
              formState.privateIDError ||
              formState.hashOfRecordError
            }
            size="large"
            variant="contained"
          >
            TxID
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};
export default Tools;
