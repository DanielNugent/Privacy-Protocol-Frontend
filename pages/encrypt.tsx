import React, { ReactElement, Fragment, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { EncryptionContext } from "../state/encryptionstate";
import { ENCRYPTION, DECRYPTION } from "../constants/encryption";

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

export default function Encrypt(): ReactElement {
  const {
    encryptionState,
    onChangeKey,
    uploadFile,
    onChangeMode,
    handleEncryptDecrypt,
  } = useContext(EncryptionContext);
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
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="Key"
          value={encryptionState.key}
          onChange={onChangeKey}
          required
          fullWidth
          id="fullWidth"
          helperText="The Encryption/Decryption should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={8}
          mt={1}
          mb={3}
        >
          <FormControl style={{ minWidth: 180 }}>
            <InputLabel id="encrypt-decrypt-sel-label">Mode</InputLabel>
            <Select
              onChange={(e) => onChangeMode(e)}
              id="encrypt-decrypt-select"
              defaultValue={ENCRYPTION}
            >
              <MenuItem value={ENCRYPTION}>Encrypt</MenuItem>
              <MenuItem value={DECRYPTION}>Decrypt</MenuItem>
            </Select>
          </FormControl>
          <input
            style={{ display: "none" }}
            id="upload-button-file"
            type="file"
            onChange={uploadFile}
          />
          <label htmlFor="upload-button-file">
            <Button
              component="span"
              size="large"
              color={encryptionState.uploaded ? "success" : "primary"}
              variant="contained"
            >
              {encryptionState.uploaded ? "File Uploaded" : "Upload File"}
            </Button>
          </label>
          <Button
            disabled={
              encryptionState.keyError ||
              !encryptionState.uploaded ||
              (encryptionState.mode !== ENCRYPTION &&
                encryptionState.mode !== DECRYPTION)
            }
            size="large"
            variant="contained"
            onClick={handleEncryptDecrypt}
          >
            Encrypt/Decrypt File
          </Button>
        </Stack>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">0x</InputAdornment>
            ),
          }}
          label="Hash of record"
          value={encryptionState.hashOfRecord}
          fullWidth
          helperText="When you encrypt a record, the hash of the record is automatically generated for you!"
          id="fullWidth"
          inputProps={{ maxLength: 64, readOnly: true }}
        />
      </Box>
    </Fragment>
  );
}
