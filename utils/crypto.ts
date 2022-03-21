import { sha3_256 } from "js-sha3";

function is256BitHex(s: string | undefined) {
  if (s === undefined || !s) return false;
  return Boolean(s && s.match(/^[0-9a-f]+$/i) && s.length === 64);
}

function is512BitHex(s: string | undefined) {
  if (s === undefined || !s) return false;
  return Boolean(s && s.match(/^[0-9a-f]+$/i) && s.length === 128);
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


function convertWordArrayToUint8Array(wordArray: any) {
  let arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
  let length = wordArray.hasOwnProperty("sigBytes")
    ? wordArray.sigBytes
    : arrayOfWords.length * 4;
  let uInt8Array = new Uint8Array(length),
    index = 0,
    word,
    i;
  for (i = 0; i < length; i++) {
    word = arrayOfWords[i];
    uInt8Array[index++] = word >> 24;
    uInt8Array[index++] = (word >> 16) & 0xff;
    uInt8Array[index++] = (word >> 8) & 0xff;
    uInt8Array[index++] = word & 0xff;
  }
  return uInt8Array;
}

export { sha3, is256BitHex, is512BitHex, convertWordArrayToUint8Array };
