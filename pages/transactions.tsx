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
import { ContractContext } from "../state/contract";
import HashOfScansTable from "../components/hashofscantable";
import { WalletContext } from "../state/wallet";

const ScanInput = styled(TextField)`
  margin-bottom: 20px;
`;

interface Props {
  initError: boolean;
}

const Transactions: NextPage<Props> = ({ initError }) => {
  const [error, setError] = useState<boolean>(initError);
  const router = useRouter();
  const { getAllTransactions } = useContext(ContractContext);

  function onChangePublicID(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let publicID: string = e.target.value;
    setError(
      Boolean(
        (publicID && !(publicID && publicID.match(/^[0-9a-f]+$/i))) ||
          publicID.length !== 64
      )
    );
    if (publicID === undefined || publicID === null || publicID.length === 0) {
      router.replace({
        pathname: router.pathname,
      });
    } else
      router.replace({
        pathname: router.pathname,
        query: { publicID: publicID },
      });
  }
  const { publicID } = router.query;
  const publicIDString: string =
    !publicID || publicID instanceof Array ? "" : publicID;
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
        <ScanInput
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
          error={error}
          helperText="The PublicID should be a 256 bit string in Hexadecimal format"
          inputProps={{ maxLength: 64 }}
        />
        <Typography style={{ marginBottom: 10 }}>
          <Link href="/tools">Calculate my PublicID</Link>
        </Typography>
        <Button disabled={error} size="large" variant="contained" onClick={() => getAllTransactions()}>
          Find Transactions
        </Button>
      </Box>
    </Fragment>
  );
};

Transactions.getInitialProps = ({ query }) => {
  let { publicID } = query;
  if (publicID instanceof Array) return { initError: false };
  return {
    initError: Boolean(
      !(publicID && publicID.match(/^[0-9a-f]+$/i)) || publicID.length !== 64
    ),
  };
};

export default Transactions;
