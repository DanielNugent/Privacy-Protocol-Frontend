import React, { useReducer, createContext } from "react";
import { sha3, is256BitHex } from "../utils/crypto";
import { dateToYYYYMMDD } from "../utils";
import {
  HASH_OF_SCAN,
  DATE_OF_BIRTH,
  GENDER,
  COUNTRY_OF_BIRTH,
  PUBLIC_ID,
  PINCODE,
  PRIVATE_ID,
  KEY,
  HASH_OF_RECORD,
  TXID,
} from "../constants/form";

interface IFormState {
  hashOfScan: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: {
    code: string;
    label: string;
    phone: string;
  };
  publicID: string;
  pincode: string;
  privateID: string;
  key: string;
  hashOfRecord: string;
  txID: string;
  hashOfScanError: boolean;
  dateOfBirthError: boolean;
  genderError: boolean;
  countryOfBirthError: boolean;
  publicIDError: boolean;
  pincodeError: boolean;
  privateIDError: boolean;
  keyError: boolean;
  hashOfRecordError: boolean;
  txIDError: boolean;
}

interface IAction {
  value: any;
  type: string;
}

interface Props {
  children: React.ReactNode;
}

interface IFormContext {
  formState: IFormState;
  onChangeField: (field: string, e: any) => void;
  getPublicID: () => void;
  getPrivateID: () => void;
  getEncryptionKey: () => void;
  getTxID: () => void;
}
const initialFormState = {
  hashOfScan: "",
  dateOfBirth: new Date().toDateString(),
  gender: "",
  countryOfBirth: { code: "AF", label: "Afghanistan", phone: "93" },
  publicID: "",
  pincode: "",
  privateID: "",
  key: "",
  hashOfRecord: "",
  txID: "",
  hashOfScanError: true,
  dateOfBirthError: false,
  genderError: true,
  countryOfBirthError: false,
  publicIDError: true,
  pincodeError: true,
  privateIDError: true,
  keyError: true,
  hashOfRecordError: true,
  txIDError: true,
};

function reducer(state: IFormState, action: IAction) {
  switch (action.type) {
    case HASH_OF_SCAN:
      return {
        ...state,
        hashOfScan: action.value,
        hashOfScanError: is256BitHex(action.value),
      };
    case DATE_OF_BIRTH:
      return {
        ...state,
        dateOfBirth: action.value,
        dateOfBirthError: !Boolean(action.value),
      };
    case GENDER:
      return {
        ...state,
        gender: action.value,
        genderError: !(
          action.value === "M" ||
          action.value === "F" ||
          action.value === "O"
        ),
      };
    case COUNTRY_OF_BIRTH:
      return {
        ...state,
        countryOfBirth: action.value,
        countryOfBirthError: !Boolean(action.value),
      };
    case PUBLIC_ID:
      return {
        ...state,
        publicID: action.value,
        publicIDError: is256BitHex(action.value),
      };
    case PINCODE:
      return {
        ...state,
        pincode: action.value,
        pincodeError: !action.value,
      };
    case PRIVATE_ID:
      return {
        ...state,
        privateID: action.value,
        privateIDError: is256BitHex(action.value),
      };
    case KEY:
      return {
        ...state,
        key: action.value,
        keyError: is256BitHex(action.value),
      };
    case HASH_OF_RECORD:
      return {
        ...state,
        hashOfRecord: action.value,
        hashOfRecordError: is256BitHex(action.value),
      };
    case TXID:
      return {
        ...state,
        txID: action.value,
        txIDError: is256BitHex(action.value),
      };
    default:
      throw new Error();
  }
}

export const ToolsFormContext = createContext<IFormContext>({
  formState: initialFormState,
  onChangeField: () => {},
  getPublicID: () => {},
  getPrivateID: () => {},
  getEncryptionKey: () => {},
  getTxID: () => {},
});

export function ToolsFormProvider({ children }: Props) {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  const onChangeField = (field: string, e: any) => {
    dispatch({ type: field, value: e.target.value });
  };
  const getPublicID = () => {
    let hash: string = sha3(
      formState.hashOfScan +
        dateToYYYYMMDD(formState.dateOfBirth) +
        formState.gender +
        formState.countryOfBirth.code
    );
    dispatch({ type: PUBLIC_ID, value: hash });
  };

  const getPrivateID = () => {
    let hash: string = sha3(
      formState.hashOfScan + formState.publicID + formState.pincode
    );
    dispatch({ type: PRIVATE_ID, value: hash });
  };

  const getEncryptionKey = () => {
    dispatch({
      type: KEY,
      value:
        formState.publicID.substring(0, 32) +
        formState.privateID.substring(0, 32),
    });
  };

  const getTxID = () => {
    let hash: string = sha3(
      formState.publicID + formState.privateID + formState.hashOfRecord
    );
    dispatch({ type: TXID, value: hash });
  };
  return (
    <ToolsFormContext.Provider
      value={{
        formState,
        onChangeField,
        getPublicID,
        getPrivateID,
        getEncryptionKey,
        getTxID,
      }}
    >
      {children}
    </ToolsFormContext.Provider>
  );
}
