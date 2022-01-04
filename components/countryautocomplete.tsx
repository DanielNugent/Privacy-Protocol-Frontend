import React, { ReactElement } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import countries from "../constants/countries";
interface Props {
  control: any;
}

export default function CountryAutoComplete({ control }: Props): ReactElement {
  return (
    <Controller
      render={({ field, ...props }) => (
        <Autocomplete
          {...props}
          sx={{ width: 300 }}
          onChange={(e, data) => field.onChange(data)}
          options={countries}
          getOptionLabel={(option) => option.label || ""}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country of Birth"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-country", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
      name="countryOfBirth"
      control={control}
      defaultValue={{ code: "AF", label: "Afghanistan", phone: "93" }}
    />
  );
}
