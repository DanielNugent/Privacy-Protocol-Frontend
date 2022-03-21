const THRESHOLD = 0.5;

interface IScanData {
  hash: string;
  accuracy: string;
  id: number;
}

interface ITransaction {
  hashOfRecord: string;
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

function hexString512Bits(s: string) {
  let tempS: string = s;
  while (tempS.length < 128) {
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

function two256IntTo512Hex(left: string, right: string) {
  return hexString512Bits(
    BigInt(
      "0b" +
        padBinary256(BigInt(left).toString(2)) +
        padBinary256(BigInt(right).toString(2))
    )
      .toString(16)
      .toLowerCase()
  );
}

function padBinary256(b: string) {
  let newB = b;
  while (newB.length < 256) {
    newB = "0" + newB;
  }
  return newB;
}

function padBinary512(b: string) {
  let newB = b;
  while (newB.length < 512) {
    newB = "0" + newB;
  }
  return newB;
}

function hammingDistance(simhash1: bigint, simhash2: bigint) {
  //console.log(simhash1, simhash2)
  let distance = 0;
  let s1Binary: string = padBinary512(simhash1.toString(2));
  let s2Binary: string = padBinary512(simhash2.toString(2));

  for (let i = 0; i < s1Binary.length; i++) {
    if (s1Binary.charAt(i) !== s2Binary.charAt(i)) {
      distance++;
    }
  }
  return distance / 512;
}

function findSimilarScans(scan: string, scans: Array<[string, string]>) {
  let processedScans = scans.map((scan, idx) =>
    two256IntTo512Hex(scan[0], scan[1])
  );
  console.log(processedScans[1]);
  let userScan: string = scan;
  if (userScan.charAt(1) !== "x") {
    userScan = `0x${scan}`;
  }
  let results: Array<IScanData> = [];
  processedScans.forEach((s, idx) => {
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
    results.push({
      hashOfRecord: removeHexString0x(numberToHexString(tx.hashOfRecord)),
      id: idx,
    });
  });
  return results;
}
export {
  hexString,
  hexString512Bits,
  findSimilarScans,
  findUsersTransactions,
  truncate,
  dateToYYYYMMDD,
  numberToHexString,
  two256IntTo512Hex,
  type IScanData,
  type ITransaction,
};
