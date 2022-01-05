import React, { Fragment, useReducer } from "react";
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
import { hash256, is256BitHex } from "../utils/crypto";
import { dateToYYYYMMDD } from "../utils";
import {
  HASH_OF_SCAN,
  DATE_OF_BIRTH,
  GENDER,
  COUNTRY_OF_BIRTH,
  PUBLIC_ID,
  PINCODE,
  PRIVATE_ID,
  KEY,
  HASH_OF_RECORD,
  TXID,
} from "../constants/form";

const MarginTextField = styled(TextField)`
  margin-bottom: 7px;
  margin-top: 10px;
`;

interface Props {}

interface IFormState {
  hashOfScan: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: {
    code: string;
    label: string;
    phone: string;
  };
  publicID: string;
  pincode: string;
  privateID: string;
  key: string;
  hashOfRecord: string;
  txID: string;
  hashOfScanError: boolean;
  dateOfBirthError: boolean;
  genderError: boolean;
  countryOfBirthError: boolean;
  publicIDError: boolean;
  pincodeError: boolean;
  privateIDError: boolean;
  keyError: boolean;
  hashOfRecordError: boolean;
  txIDError: boolean;
}

interface IAction {
  value: any;
  type: string;
}

const initialFormState = {
  hashOfScan: "",
  dateOfBirth: new Date().toDateString(),
  gender: "",
  countryOfBirth: { code: "AF", label: "Afghanistan", phone: "93" },
  publicID: "",
  pincode: "",
  privateID: "",
  key: "",
  hashOfRecord: "",
  txID: "",
  hashOfScanError: true,
  dateOfBirthError: false,
  genderError: true,
  countryOfBirthError: false,
  publicIDError: true,
  pincodeError: true,
  privateIDError: true,
  keyError: true,
  hashOfRecordError: true,
  txIDError: true,
};

function reducer(state: IFormState, action: IAction) {
  switch (action.type) {
    case HASH_OF_SCAN:
      return {
        ...state,
        hashOfScan: action.value,
        hashOfScanError: is256BitHex(action.value),
      };
    case DATE_OF_BIRTH:
      return {
        ...state,
        dateOfBirth: action.value,
        dateOfBirthError: !Boolean(action.value),
      };
    case GENDER:
      return {
        ...state,
        gender: action.value,
        genderError: !(
          action.value === "M" ||
          action.value === "F" ||
          action.value === "O"
        ),
      };
    case COUNTRY_OF_BIRTH:
      return {
        ...state,
        countryOfBirth: action.value,
        countryOfBirthError: !Boolean(action.value),
      };
    case PUBLIC_ID:
      return {
        ...state,
        publicID: action.value,
        publicIDError: is256BitHex(action.value),
      };
    case PINCODE:
      return {
        ...state,
        pincode: action.value,
        pincodeError: !action.value,
      };
    case PRIVATE_ID:
      return {
        ...state,
        privateID: action.value,
        privateIDError: is256BitHex(action.value),
      };
    case KEY:
      return {
        ...state,
        key: action.value,
        keyError: is256BitHex(action.value),
      };
    case HASH_OF_RECORD:
      return {
        ...state,
        hashOfRecord: action.value,
        hashOfRecordError: is256BitHex(action.value),
      };
    case TXID:
      return {
        ...state,
        txID: action.value,
        txIDError: is256BitHex(action.value),
      };
    default:
      throw new Error();
  }
}

const Tools: NextPage = ({}: Props) => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  const onChangeField = (field: string, e: any) => {
    dispatch({ type: field, value: e.target.value });
  };

  const getPublicID = () => {
    let hash: string = hash256(
      formState.hashOfScan +
        dateToYYYYMMDD(formState.dateOfBirth) +
        formState.gender +
        formState.countryOfBirth.code
    );
    dispatch({ type: PUBLIC_ID, value: hash });
  };

  const getPrivateID = () => {
    let hash: string = hash256(
      formState.hashOfScan + formState.publicID + formState.pincode
    );
    dispatch({ type: PRIVATE_ID, value: hash });
  };

  const getEncryptionKey = () => {
    let hash: string = hash256(
      formState.hashOfScan +
        dateToYYYYMMDD(formState.dateOfBirth) +
        formState.gender +
        formState.countryOfBirth
    );
    dispatch({
      type: KEY,
      value:
        formState.publicID.substring(0, 32) +
        formState.privateID.substring(0, 32),
    });
  };

  const getTxID = () => {
    let hash: string = hash256(
      formState.publicID + formState.privateID + formState.hashOfRecord
    );
    dispatch({ type: TXID, value: hash });
  };

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
              value={formState.gender}
              onChange={(e) => onChangeField(GENDER, e)}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>
          <CountryAutoComplete
            onChange={onChangeField}
            value={formState.countryOfBirth}
          />
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
          inputProps={{ maxLength: 64 }}
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
          inputProps={{ maxLength: 64 }}
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
