import React, { useReducer, createContext } from "react";
import { is256BitHex } from "../utils/crypto";
import { PUBLIC_ID, HASH_OF_RECORD } from "../constants/transactions";

interface ITransactionState {
  publicID: string;
  publicIDError: boolean;
  hashOfRecord: string;
  hashOfRecordError: boolean;
}

interface ITransactionContext {
  formState: ITransactionState;
  onChangePublicID: (e: any) => void;
  onChangeHashOfRecord: (e: any) => void;
}

interface IAction {
  value: any;
  type: string;
}

interface Props {
  children: React.ReactNode;
}

const initialTransactionState = {
  publicID: "",
  publicIDError: true,
  hashOfRecord: "",
  hashOfRecordError: true,
};

function reducer(state: ITransactionState, action: IAction) {
  switch (action.type) {
    case PUBLIC_ID:
      return {
        ...state,
        publicID: action.value,
        publicIDError: !is256BitHex(action.value),
      };
    case HASH_OF_RECORD:
      return {
        ...state,
        hashOfRecord: action.value,
        hashOfRecordError: !is256BitHex(action.value),
      };
    default:
      throw new Error();
  }
}

export const TransactionContext = createContext<ITransactionContext>({
  formState: initialTransactionState,
  onChangePublicID: () => {},
  onChangeHashOfRecord: () => {},
});

export function TransactionStateProvider({ children }: Props) {
  const [formState, dispatch] = useReducer(reducer, initialTransactionState);

  const onChangePublicID = (e: any) => {
    dispatch({ type: PUBLIC_ID, value: e.target.value });
  };

  const onChangeHashOfRecord = (e: any) => {
    dispatch({ type: HASH_OF_RECORD, value: e.target.value });
  };
  return (
    <TransactionContext.Provider
      value={{ formState, onChangePublicID, onChangeHashOfRecord }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
