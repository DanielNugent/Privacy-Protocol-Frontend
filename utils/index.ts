import { ethers } from "ethers";
const THRESHOLD = 0.4;

interface IScanData {
  hash: string;
  accuracy: string;
  id: number;
}

interface ITransaction {
  hashOfRecord: string;
  publicID: string;
  id: number;
}

function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
}

function hexString(s: string) {
  let tempS: string = s;
  while(tempS.length < 64){
    tempS = "0" + tempS;
  }
  return ("0x" + tempS).valueOf();
}

function removeHexString0x(s: string){
  return s.substring(2)
}

function numberToHexString(d: string) {
  return hexString(BigInt(d).toString(16).toLowerCase());

}
function numberToHex(d: string) {
  return BigInt(d).toString(16).toLowerCase();
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
        hash: removeHexString0x(scanHex),
        accuracy: Number(sim).toFixed(4),
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
        hashOfRecord: removeHexString0x(numberToHexString(tx.hashOfRecord)),
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
  truncate,
  type IScanData,
  type ITransaction,
};
