import React, { useReducer, createContext } from "react";
import { is256BitHex, is512BitHex } from "../utils/crypto";
import { HASH_OF_SCAN } from "../constants/register";
interface IRegisterState {
  hashOfScan: string;
  hashOfScanError: boolean;
}

interface IRegisterContext {
  hashOfScan: string;
  hashOfScanError: boolean;
  onChangeHashOfScan: (e: any) => void;
}

interface IAction {
  value: any;
  type: string;
}

interface Props {
  children: React.ReactNode;
}

const initialRegisterState = {
  hashOfScan: "",
  hashOfScanError: true,
};

function reducer(state: IRegisterState, action: IAction) {
  switch (action.type) {
    case HASH_OF_SCAN:
      return {
        ...state,
        hashOfScan: action.value,
        hashOfScanError: !is512BitHex(action.value),
      };
    default:
      throw new Error();
  }
}

export const RegisterContext = createContext<IRegisterContext>({
  ...initialRegisterState,
  onChangeHashOfScan: () => {},
});

export function RegisterStateProvider({ children }: Props) {
  const [formState, dispatch] = useReducer(reducer, initialRegisterState);
  const onChangeHashOfScan = (e: any) => {
    dispatch({ type: HASH_OF_SCAN, value: e.target.value });
  };
  return (
    <RegisterContext.Provider value={{ ...formState, onChangeHashOfScan }}>
      {children}
    </RegisterContext.Provider>
  );
}
