import React, { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface IData {
  hash: string;
  accuracy: number;
}
interface IRow {
  hashx: string;
  accuracyPercent: string;
}

function createData(hash: string, accuracy: number) {
  let hashx: string = `0x${hash}`;
  let accuracyPercent: string = (accuracy * 100).toFixed(2);
  return { hashx, accuracyPercent };
}

interface Props {}

export default function HashOfScansTable({ data }: any): ReactElement {
  const rows = data.map((data: IData) => createData(data.hash, data.accuracy));

  console.log(rows);
  return (
    <TableContainer component={Paper} sx={{marginTop: 5}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hash of Scan</TableCell>

            <TableCell align="right">Accuracy&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IRow) => (
            <TableRow
              key={row.hashx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.hashx}
              </TableCell>
              <TableCell align="right">{row.accuracyPercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
