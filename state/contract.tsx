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
import { WalletContext } from "./wallet";
import { CONTRACT_ADDRESS } from "../constants/contract";
const ABI = require("../public/PrivacyPreserving.json")["abi"];

interface IContractState {
  similarScans: Array<IScanData>;
  usersTransactions: Array<ITransaction>;
  searched: boolean;
  recordLocation: string | null;
}

interface IContract extends IContractState {
  getSimilarHashOfScans: (userHash: string) => void;
  registerHoS: (userHash: string) => void;
  getAllTransactions: (publicID: string) => void;
  newTransaction: (publicID: string, hashOfRecord: string) => void;
  getRecord: (txID: string) => void;
  newRecord: (txID: string, recordLocation: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ContractContext = createContext<IContract>({
  similarScans: [],
  usersTransactions: [],
  searched: false,
  recordLocation: null,
  getSimilarHashOfScans: () => {},
  registerHoS: () => {},
  getAllTransactions: () => {},
  newTransaction: () => {},
  getRecord: () => {},
  newRecord: () => {},
});

export function ContractProvider({ children }: Props) {
  const { defaultAccount, requestConnectWallet } = useContext(WalletContext);
  const { openErrorSnackbar, openSuccessSnackbar, openLoadingSnackbar } =
    useContext(SnackbarContext);
  const [contractState, setContractState] = useState<IContractState>({
    similarScans: [],
    usersTransactions: [],
    recordLocation: null,
    searched: false,
  });
  const [MyContract, setMyContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();

  useEffect(() => {
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      setWeb3(new Web3(window.ethereum));
      setMyContract(new web3.eth.Contract(ABI, CONTRACT_ADDRESS));
    }
  }, []);

  function getSimilarHashOfScans(userHash: string) {
    MyContract.methods
      .getHashOfScans()
      .call()
      .then((result: Array<string>) => {
        let similarScans: Array<IScanData> = findSimilarScans(userHash, result);
        if (similarScans.length === 0)
          openLoadingSnackbar("No similar scans found.");
        else openSuccessSnackbar("Found some similar scans!", "");
        setContractState((prevState) => ({
          ...prevState,
          similarScans: similarScans,
          searched: true,
        }));
      })
      .catch(() => {
        openErrorSnackbar("Error fetching scans!", "");
      });
  }

  function registerHoS(userHash: string) {
    if (defaultAccount) {
      openLoadingSnackbar("Registering hash of scan...");
      MyContract.methods
        .registerHashOfScan(hexString(userHash))
        .send({ from: defaultAccount })
        .then((result: any) => {
          openSuccessSnackbar(
            "Hash of scan registered!",
            result.transactionHash
          );
        })
        .catch((err: any) => {
          openErrorSnackbar("Something went wrong!", err.transactionHash);
        });
    }
    else openErrorSnackbar("Connect Wallet First!", "");
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
          openSuccessSnackbar("Found the transactions!", "");
        }
        setContractState((prevState) => ({
          ...prevState,
          usersTransactions: transactions,
        }));
      })
      .catch(() => {
        openErrorSnackbar(
          "Something went wrong when calling the contract!",
          ""
        );
      });
  }

  function newTransaction(publicID: string, hashOfRecord: string) {
    if (defaultAccount) {
    openLoadingSnackbar("Creating a new transaction...");
    MyContract.methods
      .addTransaction(hexString(publicID), hexString(hashOfRecord))
      .send({ from: defaultAccount })
      .then((result: any) => {
        openSuccessSnackbar("New transaction created!", result.transactionHash);
      })
      .catch((err: any) => {
        openErrorSnackbar("Something went wrong!", err.transactionHash);
      });
    }
    else openErrorSnackbar("Connect Wallet First!", "");
  }

  function getRecord(txID: string) {
    MyContract.methods
      .retrieveRecordLocation(hexString(txID))
      .call()
      .then((result: string) => {
        openSuccessSnackbar("Retrieved encrypted record location!", "");
        setContractState((prevState) => ({
          ...prevState,
          recordLocation: result,
        }));
      })
      .catch((err: any) => {
        openErrorSnackbar(
          "Could not retrieve record location, check that TxID exists!",
          ""
        );
      });
  }

  function newRecord(txID: string, recordLocation: string) {
    if(defaultAccount){
    openLoadingSnackbar("Creating an identifier...");
    MyContract.methods
      .storeRecordLocation(hexString(txID), recordLocation)
      .send({ from: defaultAccount })
      .then((result: any) => {
        openSuccessSnackbar("New record linked to identifier!", result.transactionHash);
      })
      .catch((err: any) => {
        openErrorSnackbar("Something went wrong!", err.transactionHash);
      });
    }
    else openErrorSnackbar("Connect Wallet First!", "");
  }

  return (
    <ContractContext.Provider
      value={{
        ...contractState,
        getSimilarHashOfScans,
        getAllTransactions,
        registerHoS,
        newTransaction,
        getRecord,
        newRecord,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
