import React, { useReducer, createContext, useContext } from "react";
import { sha3, is256BitHex } from "../utils/crypto";
import {
  KEY,
  ENCRYPTION,
  DECRYPTION,
  MODE,
  UPLOAD,
  LOADING,
  ERROR,
  HASH_OF_RECORD,
} from "../constants/encryption";
import { SnackbarContext } from "./snackbar";
import { convertWordArrayToUint8Array } from "../utils/crypto";
import crypto from "crypto-js";

interface IEncryptionState {
  key: string;
  keyError: boolean;
  hashOfRecord: string;
  loading: boolean;
  uploaded: boolean;
  mode: string;
  error: string | null;
  file: any;
}

interface IAction {
  value: any;
  type: string;
}

interface Props {
  children: React.ReactNode;
}

interface IEncryptionContext {
  encryptionState: IEncryptionState;
  onChangeKey: (e: any) => void;
  uploadFile: (e: any) => void;
  onChangeMode: (e: any) => void;
  handleEncryptDecrypt: () => void;
}
const initialEncryptionState = {
  key: "",
  keyError: true,
  hashOfRecord: "",
  loading: false,
  uploaded: false,
  mode: ENCRYPTION,
  error: null,
  file: null,
};

function reducer(state: IEncryptionState, action: IAction) {
  switch (action.type) {
    case KEY:
      return {
        ...state,
        key: action.value,
        keyError: !is256BitHex(action.value),
      };
    case MODE:
      return {
        ...state,
        mode: action.value,
        error: null,
      };
    case UPLOAD:
      return {
        ...state,
        uploaded: true,
        loading: true,
        error: null,
        file: action.value,
      };
    case LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.value,
      };
    case HASH_OF_RECORD:
      return {
        ...state,
        hashOfRecord: action.value,
      };
    default:
      throw new Error();
  }
}

export const EncryptionContext = createContext<IEncryptionContext>({
  encryptionState: initialEncryptionState,
  onChangeKey: () => {},
  uploadFile: () => {},
  onChangeMode: () => {},
  handleEncryptDecrypt: () => {},
});

export function EncryptionStateProvider({ children }: Props) {
  const [encryptionState, dispatch] = useReducer(
    reducer,
    initialEncryptionState
  );

  const { openErrorSnackbar, openSuccessSnackbar } =
    useContext(SnackbarContext);

  const onChangeKey = (e: any) => {
    dispatch({ type: KEY, value: e.target.value });
  };

  const uploadFile = (e: any) => {
    let file = e.target.files[0];
    if (file) dispatch({ type: UPLOAD, value: file });
  };

  const encryptFile = () => {
    if (encryptionState.file) {
      try {
        let reader = new FileReader();
        reader.onload = () => {
          let key = crypto.enc.Hex.parse(encryptionState.key);
          let IV = crypto.enc.Hex.parse("00000000000000000000000000000000");
          //@ts-ignore - Typescript doesn't pick up reader type correctly
          let wordArray = crypto.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
          let encrypted = crypto.AES.encrypt(wordArray, key, {
            iv: IV,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7,
          }).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
          dispatch({ type: HASH_OF_RECORD, value: sha3(encrypted) });
          let fileEnc = new Blob([encrypted]); // Create blob from string
          openSuccessSnackbar("File encrypted, now downloading...", "");
          let a = document.createElement("a");
          let url = window.URL.createObjectURL(fileEnc);
          a.href = url;
          a.download = encryptionState.file.name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
        reader.readAsArrayBuffer(encryptionState.file);
      } catch (e) {
        openErrorSnackbar("Something went wrong encrypting your file", "");
      }
    }
  };

  const decryptFile = () => {
    if (encryptionState.file) {
      try {
        let reader = new FileReader();
        reader.onload = () => {
          let key = crypto.enc.Hex.parse(encryptionState.key);
          let IV = crypto.enc.Hex.parse("00000000000000000000000000000000");
          //@ts-ignore - Typescript doesn't pick up reader type correctly
          let decrypted = crypto.AES.decrypt(reader.result, key, {
            iv: IV,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7,
          }); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
          let typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array
          let fileDec = new Blob([typedArray]); // Create blob from typed array
          openSuccessSnackbar("File decrypted, now downloading...", "");
          let a = document.createElement("a");
          let url = window.URL.createObjectURL(fileDec);
          a.href = url;
          a.download = encryptionState.file.name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
        reader.readAsText(encryptionState.file);
      } catch (e) {
        openErrorSnackbar("Something went wrong decrypting your file", "");
      }
    }
  };

  const handleEncryptDecrypt = () => {
    if (encryptionState.mode === ENCRYPTION) {
      encryptFile();
    } else if (encryptionState.mode === DECRYPTION) {
      decryptFile();
    }
  };

  const onChangeMode = (e: any) => {
    dispatch({ type: MODE, value: e.target.value });
  };

  return (
    <EncryptionContext.Provider
      value={{
        encryptionState,
        onChangeKey,
        uploadFile,
        onChangeMode,
        handleEncryptDecrypt,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
}
