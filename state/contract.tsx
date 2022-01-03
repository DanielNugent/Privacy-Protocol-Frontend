declare let window: any;
import React, { useState, useEffect, useContext, createContext } from "react";
import {
  findSimilarScans,
  findUsersTransactions,
  IScanData,
  ITransaction,
  hexString,
} from "../utils/index";
import Web3 from "web3";
import { SnackbarContext } from "./snackbar";

const ABI = require("../public/PrivacyPreserving.json")["abi"];
const CONTRACT_ADDRESS = "0x068729E25c1BEe3a67D0E3f2F9F47A351640D83C";

interface IContractState {
  similarScans: Array<IScanData>;
  usersTransactions: Array<ITransaction>;
  searched: boolean;
}

interface IContract {
  similarScans: Array<IScanData>;
  usersTransactions: Array<ITransaction>;
  searched: boolean;
  getSimilarHashOfScans: (userHash: string) => void;
  registerHoS: (userHash: string, userAddress: string) => void;
  getAllTransactions: (publicID: string) => void;
  newTransaction: (
    publicID: string,
    hashOfRecord: string,
    userAddress: string
  ) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ContractContext = createContext<IContract>({
  similarScans: [],
  usersTransactions: [],
  searched: false,
  getSimilarHashOfScans: () => {},
  registerHoS: () => {},
  getAllTransactions: () => {},
  newTransaction: () => {},
});

export function ContractProvider({ children }: Props) {
  const { openErrorSnackbar, openSuccessSnackbar, openLoadingSnackbar } =
    useContext(SnackbarContext);
  const [contractState, setContractState] = useState<IContractState>({
    similarScans: [],
    usersTransactions: [],
    searched: false,
  });
  const [MyContract, setMyContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();

  useEffect(() => {
    let web3 = new Web3(window.ethereum);
    setWeb3(new Web3(window.ethereum));
    setMyContract(new web3.eth.Contract(ABI, CONTRACT_ADDRESS));
  }, []);

  function getSimilarHashOfScans(userHash: string) {
    MyContract.methods
      .getHashOfScans()
      .call()
      .then((result: Array<string>) => {
        let similarScans: Array<IScanData> = findSimilarScans(userHash, result);
        if (similarScans.length === 0)
          openLoadingSnackbar("No similar scans found.");
        else openSuccessSnackbar("Found some similar scans!");
        setContractState((prevState) => ({
          ...prevState,
          similarScans: similarScans,
          searched: true,
        }));
      })
      .catch(() => {
        openErrorSnackbar("Error fetching scans!");
      });
  }

  function registerHoS(userHash: string, userAddress: string) {
    MyContract.methods
      .registerHashOfScan(hexString(userHash))
      .send({ from: userAddress })
      .then((result: any) => {
        console.log(result);
        openSuccessSnackbar("Hash of scan registered!");
      })
      .catch(() => {
        openErrorSnackbar("Something went wrong!");
      });
  }

  function getAllTransactions(publicID: string) {
    MyContract.methods
      .getTransactions()
      .call()
      .then((result: any) => {
        let transactions: Array<ITransaction> = findUsersTransactions(
          publicID,
          result
        );
        if (transactions.length === 0) {
          openLoadingSnackbar("No transactions found for that PublicID");
        } else {
          openSuccessSnackbar("Found the transactions!");
        }
        setContractState((prevState) => ({
          ...prevState,
          usersTransactions: transactions,
        }));
        console.log(result);
      })
      .catch(() => {
        openErrorSnackbar("Something went wrong!");
      });
  }

  function newTransaction(
    publicID: string,
    hashOfRecord: string,
    userAddress: string
  ) {
    MyContract.methods
      .addTransaction(hexString(publicID), hexString(hashOfRecord))
      .send({ from: userAddress })
      .then((result: any) => {
        openSuccessSnackbar("New transaction created!");
        console.log(result);
      })
      .catch(() => {
        openErrorSnackbar("Something went wrong!");
      });
  }
  return (
    <ContractContext.Provider
      value={{
        ...contractState,
        getSimilarHashOfScans,
        getAllTransactions,
        registerHoS,
        newTransaction,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
