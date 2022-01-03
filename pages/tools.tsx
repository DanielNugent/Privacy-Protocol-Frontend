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

const PublicIDInput = styled(TextField)`
  margin-bottom: 20px;
`;

interface Props {}

const Tools: NextPage = ({}: Props) => {
  const [value, setValue] = React.useState(null);
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
        <PublicIDInput
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="Hash of Scan"
          required
          fullWidth
          id="fullWidth"
          helperText="The Hash of the Scan should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mt={1}
        >
          <LocalizationProvider
            sx={{ width: 200 }}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              label="Date of Birth"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>
        </Stack>
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
          <Button size="large" variant="contained">
            PublicID
          </Button>
          <Button size="large" variant="contained">
            PrivateID
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
