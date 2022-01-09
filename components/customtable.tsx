import React, { ReactElement } from "react";
import { DataGrid } from "@mui/x-data-grid";

const SCANS = "scans";
const TRANSACTIONS = "transactions";

interface Props {
  data: Array<any>;
  table: string;
}
const scanColumns = [
  { field: "hash", headerName: "Hash of Scan", width: 600 },
  {
    field: "accuracy",
    headerName: "Hamming distance",
    description: "How close the new scan resembles this one (the lower the better).",
    width: 200,
  },
];

const transactionColumns = [
  {
    field: "hashOfRecord",
    headerName: "Hash of Record",
    width: 800,
  },
];

export default function CustomTable({ data, table }: Props): ReactElement {
  function getColumns(type: string) {
    switch (type) {
      case SCANS:
        return scanColumns;
      case TRANSACTIONS:
        return transactionColumns;
      default:
        return scanColumns;
    }
  }

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        margin: "20px 0 40px 0",
        overflowY: "hidden",
      }}
    >
      <DataGrid
        disableColumnMenu
        rows={data}
        columns={getColumns(table)}
        pageSize={5}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
