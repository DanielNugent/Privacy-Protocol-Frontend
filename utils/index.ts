import { ethers } from "ethers";
const THRESHOLD = 0.1;

interface IScanData {
  hash: string;
  accuracy: number;
  id: number;
}

interface ITransaction {
  hashOfRecord: string;
  publicID: string;
  id: number;
}
function hexString(s: string) {
  return ("0x" + s).valueOf();
}
function numberToHexString(d: string) {
  return hexString(BigInt(d).toString(16).toLowerCase());
}
function hammingWeight(l: bigint) {
  let c;
  for (c = 0; l; c++) {
    l &= l - BigInt(1);
  }
  return c;
}

function similarity(simhash1: bigint, simhash2: bigint) {
  return (
    hammingWeight(simhash1 & simhash2) / hammingWeight(simhash1 | simhash2)
  );
}

function findSimilarScans(scan: string, scans: Array<string>) {
  let userScan: string = scan;
  if (userScan.charAt(1) !== "x") {
    userScan = `0x${scan}`;
  }
  let results: Array<IScanData> = [];
  scans.forEach((s, idx) => {
    let scanHex: string = numberToHexString(s);
    let sim: number = similarity(BigInt(userScan), BigInt(scanHex));
    if (sim > THRESHOLD) {
      results.push({
        hash: scanHex,
        accuracy: sim,
        id: idx,
      });
    }
  });
  return results;
}

function findUsersTransactions(
  publicID: string,
  transactions: Array<ITransaction>
) {
  let publicIDHex: string = publicID;
  if (publicIDHex.charAt(1) !== "x") {
    publicIDHex = `0x${publicID}`.toLowerCase();
  }
  let results: Array<ITransaction> = [];
  transactions.forEach((tx, idx) => {
    let txHexID: string = numberToHexString(tx.publicID);
    if (txHexID === publicIDHex) {
      results.push({
        publicID: txHexID,
        hashOfRecord: numberToHexString(tx.hashOfRecord),
        id: idx,
      });
    }
  });
  console.log(results);
  return results;
}
export {
  similarity,
  hexString,
  findSimilarScans,
  findUsersTransactions,
  type IScanData,
  type ITransaction,
};
