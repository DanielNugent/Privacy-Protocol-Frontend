import { ethers } from "ethers";
const THRESHOLD = 0.4;

interface IScanData {
  hash: string;
  accuracy: number;
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
  scans.forEach((s) => {
    let scanHex: string = BigInt(s).toString(16);
    let sim: number = similarity(BigInt(userScan), BigInt("0x" + scanHex));
    console.log(sim);
    if (sim > THRESHOLD) {
      results.push({
        hash: scanHex,
        accuracy: sim,
      });
    }
  });
  console.log(results);
  return results;
}
export { similarity, findSimilarScans };
