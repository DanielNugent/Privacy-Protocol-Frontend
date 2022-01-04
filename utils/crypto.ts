import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";

function strip64HexStart(s: string){
  let formattedString: string = s;
  if (formattedString.length === 66) {
    formattedString = formattedString.substring(2);
  }
  return formattedString;
}

function hash256Hex(s: string) {
  let formattedString: string = strip64HexStart(s);
  const value = CryptoJS.enc.Hex.parse(formattedString);
  return sha256(value).toString(CryptoJS.enc.Hex);
}

function hash256(s: string) {
  return sha256(s).toString(CryptoJS.enc.Hex);
}

export { hash256 };
