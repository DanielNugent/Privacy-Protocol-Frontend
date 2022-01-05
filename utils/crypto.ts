import { sha3_256 } from "js-sha3";
function is256BitHex(s: string | undefined) {
  if (s === undefined || !s) return false;
  return Boolean(!(s && s.match(/^[0-9a-f]+$/i)) || s.length !== 64);
}

function strip64HexStart(s: string) {
  let formattedString: string = s;
  if (formattedString.length === 66) {
    formattedString = formattedString.substring(2);
  }
  return formattedString;
}

function hash256Hex(s: string) {
  let formattedString: string = strip64HexStart(s);
  return sha3_256(formattedString);
}

function sha3(s: string) {
  return sha3_256(s.toLowerCase());
}

export { sha3, is256BitHex };
