const THRESHOLD = 0.5;

function hammingWeight(l: bigint) {
  let c;
  for (c = 0; l; c++) {
    l &= l - BigInt(1);
  }
  return c;
}

function similarity(simhash1: string, simhash2: string) {
  let sh1: bigint = BigInt(simhash1);
  let sh2: bigint = BigInt(simhash2);
  return hammingWeight(sh1 & sh2) / hammingWeight(sh1 | sh2);
}

function findSimilarScans(scan: string, scans: Array<string>) {
  if (scan.charAt(1) !== "x") {
    scan = "0x" + scan;
  }
  let results: Array<any> = [];
  scans.forEach((s) => {
    if (similarity(scan, s) > THRESHOLD) {
      results.push(s);
    }
  });
  return results;
}
export { similarity };
