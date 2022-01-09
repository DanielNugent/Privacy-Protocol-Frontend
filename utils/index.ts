const THRESHOLD = 0.45;

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

function dateToYYYYMMDD(str: string) {
  let dateObj = new Date(str);
  let month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12
  let day = dateObj.getUTCDate().toString();
  if (day.length === 1) {
    day = "0" + day;
  }
  if (month.length === 1) {
    month = "0" + month;
  }
  let year = dateObj.getUTCFullYear().toString();
  return year + month + day;
}
function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
}

function hexString(s: string) {
  let tempS: string = s;
  while (tempS.length < 64) {
    tempS = "0" + tempS;
  }
  return ("0x" + tempS).valueOf();
}

function removeHexString0x(s: string) {
  return s.substring(2);
}

function numberToHexString(d: string) {
  return hexString(BigInt(d).toString(16).toLowerCase());
}

function hammingDistance(simhash1: bigint, simhash2: bigint) {
  let distance = 0;
  let s1Binary: string = simhash1.toString(2);
  let s2Binary: string = simhash2.toString(2);

  for(let i = 0; i < s1Binary.length; i++){
    if(s1Binary.charAt(i) !== s2Binary.charAt(i)){
      distance++;
    }
  }
  console.log(distance);
  return (distance/256);
}

function findSimilarScans(scan: string, scans: Array<string>) {
  let userScan: string = scan;
  if (userScan.charAt(1) !== "x") {
    userScan = `0x${scan}`;
  }
  let results: Array<IScanData> = [];
  scans.forEach((s, idx) => {
    let scanHex: string = numberToHexString(s);

    let dist: number = hammingDistance(BigInt(userScan), BigInt(scanHex));
    if (dist <= THRESHOLD) {
      results.push({
        hash: removeHexString0x(scanHex),
        accuracy: Number(dist).toFixed(6),
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
  return results;
}
export {
  hexString,
  findSimilarScans,
  findUsersTransactions,
  truncate,
  dateToYYYYMMDD,
  type IScanData,
  type ITransaction,
};
