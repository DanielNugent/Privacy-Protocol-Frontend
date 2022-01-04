import React, { Fragment, useState, useContext } from "react";
import { useRouter } from "next/router";
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
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import CountryAutoComplete from "../components/countryautocomplete";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import countries from "../constants/countries";
import { hash256 } from "../utils/crypto";

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
}

const formInputs: Array<string> = [
  "hashOfScan",
  "dateOfBirth",
  "gender",
  "countryOfBirth",
  "publicID",
  "pincode",
  "privateID",
  "key",
  "hashOfRecord",
  "txID",
];

const Tools: NextPage = ({}: Props) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IFormState>();

  const onSubmitPublicID = () => {
    console.log(
      getValues([
        "hashOfScan",
        "dateOfBirth",
        "gender",
        "countryOfBirth",
        "publicID",
        "pincode",
        "privateID",
        "key",
        "hashOfRecord",
        "txID",
      ])
    );
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
        <Controller
          name="hashOfScan"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              error={!!errors.hashOfScan}
              label="hashOfScan"
              fullWidth
              id="hash-of-scan"
              helperText="The hashOfScan should be a 256 bit string in Hexadecimal format"
              inputProps={{ maxLength: 64 }}
              {...field}
            />
          )}
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
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl style={{ minWidth: 180 }}>
            <InputLabel id="gender-input">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} error={!!errors.gender}>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <CountryAutoComplete control={control} />
        </Stack>
        <Controller
          name="publicID"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              label="PublicID"
              error={!!errors.publicID}
              fullWidth
              id="public-id"
              helperText="The PublicID should be a 256 bit string in Hexadecimal format"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />
        <Controller
          name="pincode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              label="Pin code"
              required
              type="password"
              error={!!errors.pincode}
              fullWidth
              id="pincode"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />
        <Controller
          name="privateID"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              label="PrivateID"
              error={!!errors.privateID}
              fullWidth
              id="private-id"
              helperText="The PrivateID should be a 256 bit string in Hexadecimal format"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />
        <Controller
          name="key"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              label="Encyption/Decryption Key"
              error={!!errors.key}
              fullWidth
              id="encryption-decryption-key"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />
        <Controller
          name="hashOfRecord"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              label="Hash of the record"
              error={!!errors.hashOfRecord}
              fullWidth
              id="hash-of-record"
              helperText="The Hash of the record should be a 256 bit string in Hexadecimal format"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />
        <Controller
          name="txID"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MarginTextField
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">0x</InputAdornment>
                ),
              }}
              label="TxID"
              error={!!errors.txID}
              fullWidth
              id="tx-id"
              inputProps={{ maxLength: 64 }}
            />
          )}
        />

        <Stack mt={2} direction="row" spacing={4}>
          <Button
            size="large"
            variant="contained"
            disabled={
              false
              /*!errors.hashOfScan ||
              !errors.gender ||
              !errors.dateOfBirth ||
              !errors.countryOfBirth*/
            }
            onClick={() => onSubmitPublicID()}
          >
            PublicID
          </Button>
          <Button size="large" variant="contained">
            PrivateID
          </Button>
          <Button size="large" variant="contained">
            Key
          </Button>
          <Button size="large" variant="contained">
            TxID
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};
export default Tools;
