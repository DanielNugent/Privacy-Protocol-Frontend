import React, { useReducer, createContext } from "react";
import { is256BitHex } from "../utils/crypto";
import { RECORD_LOCATION, TX_ID } from "../constants/identifier";

interface ITransactionState {
  txID: string;
  txIDError: boolean;
  recordLocation: string;
  recordLocationError: boolean;
}

interface IIdentifierContext {
  formState: ITransactionState;
  onChangeTxID: (e: any) => void;
  onChangeRecordLocation: (e: any) => void;
}

interface IAction {
  value: any;
  type: string;
}

interface Props {
  children: React.ReactNode;
}

const initialTransactionState = {
  txID: "",
  txIDError: true,
  recordLocation: "",
  recordLocationError: true,
};

function reducer(state: ITransactionState, action: IAction) {
  switch (action.type) {
    case TX_ID:
      return {
        ...state,
        txID: action.value,
        txIDError: !is256BitHex(action.value),
      };
    case RECORD_LOCATION:
      return {
        ...state,
        recordLocation: action.value,
        recordLocationError: !action.value,
      };
    default:
      throw new Error();
  }
}

export const IdentifierContext = createContext<IIdentifierContext>({
  formState: initialTransactionState,
  onChangeTxID: () => {},
  onChangeRecordLocation: () => {},
});

export function IdentifierStateProvider({ children }: Props) {
  const [formState, dispatch] = useReducer(reducer, initialTransactionState);

  const onChangeTxID = (e: any) => {
    dispatch({ type: TX_ID, value: e.target.value });
  };

  const onChangeRecordLocation = (e: any) => {
    dispatch({ type: RECORD_LOCATION, value: e.target.value });
  };

  return (
    <IdentifierContext.Provider
      value={{ formState, onChangeTxID, onChangeRecordLocation }}
    >
      {children}
    </IdentifierContext.Provider>
  );
}
