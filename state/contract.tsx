declare let window: any;
import React, { useState, useEffect, useContext, createContext } from "react";
import { findSimilarScans } from "../utils/index";
import Web3 from "web3";
import { SnackbarContext } from "./snackbar";

const ABI =
  require("../../artifacts/contracts/PrivacyPreserving.sol/PrivacyPreserving.json")[
    "abi"
  ];
const ADDRESS = "0x068729E25c1BEe3a67D0E3f2F9F47A351640D83C";

interface IScanData {
  hash: string;
  accuracy: number;
}

interface IContractState {
  similarScans: Array<IScanData>;
  searched: boolean;
}

interface IContract {
  similarScans: Array<IScanData>;
  searched: boolean;
  getSimilarHashOfScans: (userHash: string) => void;
  registerHoS: (userHash: string, userAddress: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ContractContext = createContext<IContract>({
  similarScans: [],
  searched: false,
  getSimilarHashOfScans: () => {},
  registerHoS: () => {},
});

export function ContractProvider({ children }: Props) {
  const { openErrorSnackbar, openSuccessSnackbar, openLoadingSnackbar } =
    useContext(SnackbarContext);
  const [contractState, setContractState] = useState<IContractState>({
    similarScans: [],
    searched: false,
  });
  const [MyContract, setMyContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();

  useEffect(() => {
    let web3 = new Web3(window.ethereum);
    setWeb3(new Web3(window.ethereum));
    setMyContract(new web3.eth.Contract(ABI, ADDRESS));
  }, []);

  function getSimilarHashOfScans(userHash: string) {
    MyContract.methods
      .getHashOfScans()
      .call()
      .then((result: Array<string>) => {
        let similarScans: Array<IScanData> = findSimilarScans(userHash, result);
        if (similarScans.length === 0)
          openLoadingSnackbar("No similar hashes found.");
        setContractState((prevState) => ({
          ...prevState,
          similarScans: similarScans,
          searched: true,
        }));
      })
      .catch(() => {
        openErrorSnackbar("Error fetching hashes!");
      });
  }

  function registerHoS(userHash: string, userAddress: string) {
    MyContract.methods
      .registerHashOfScan(("0x" + userHash).valueOf())
      .send({ from: userAddress })
      .then((result: any) => {
        console.log(result);
        openSuccessSnackbar("Hash of scan registered!");
      })
      .catch((err: any) => {
        console.log(err);
        openErrorSnackbar("Something went wrong!");
      });
  }

  return (
    <ContractContext.Provider
      value={{ ...contractState, getSimilarHashOfScans, registerHoS }}
    >
      {children}
    </ContractContext.Provider>
  );
}
