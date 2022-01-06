declare let window: any;
import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  CHAIN_ID,
  WRONG_CHAIN_MESSAGE,
  WALLET_DISCONNECTED_MESSAGE,
  INSTALL_METAMASK,
  GENERIC_MESSAGE,
} from "../constants/wallet";

interface Props {
  children: React.ReactNode;
}

interface IWallet {
  errorMessage: string | null;
  defaultAccount: any;
  userBalance: string | null;
  loading: boolean;
}

export const WalletContext = createContext<IWallet>({
  errorMessage: null,
  defaultAccount: null,
  userBalance: null,
  loading: false,
});

export function WalletProvider({ children }: Props) {
  const [walletState, setWalletState] = useState<IWallet>({
    errorMessage: null,
    defaultAccount: null,
    userBalance: null,
    loading: true,
  });

  function accountChangeHandler(addresses: Array<string> | string) {
    let address: string = addresses instanceof Array ? addresses[0] : addresses;
    let errorMsg = address ? null : WALLET_DISCONNECTED_MESSAGE;
    setWalletState((prevState) => ({
      ...prevState,
      defaultAccount: address,
      errorMessage: errorMsg,
      loading: false,
    }));
    if (address) setUserBalance(address);
  }

  function setUserBalance(address: string) {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance: string) => {
        setWalletState((prevState) => ({
          ...prevState,
          userBalance: ethers.utils.formatEther(balance),
          errorMessage: null,
          loading: false,
        }));
      })
      .catch(() => {
        setWalletState((prevState) => ({
          ...prevState,
          errorMessage: GENERIC_MESSAGE,
          loading: false,
        }));
      });
  }

  function changedChainHandler(chain_id: string) {
    console.log(chain_id, CHAIN_ID);
    if (chain_id === CHAIN_ID) window.location.reload();
    else
      setWalletState((prevState) => ({
        ...prevState,
        errorMessage: WRONG_CHAIN_MESSAGE,
      }));
  }

  const handleNetworkSwitch = async () => {
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID }],
      })
      .catch(() => {
        setWalletState((prevState) => ({
          ...prevState,
          errorMessage: GENERIC_MESSAGE,
          loading: false,
        }));
      });
  };

  useEffect(() => {
    if (window.ethereum) {
      setWalletState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: Array<string>) => {
          accountChangeHandler(result[0]);
          handleNetworkSwitch();
        })
        .catch(() => {
          setWalletState((prevState) => ({
            ...prevState,
            loading: false,
          }));
        });
    } else {
      setWalletState((prevState) => ({
        ...prevState,
        errorMessage: INSTALL_METAMASK,
      }));
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountChangeHandler);
      window.ethereum.on("chainChanged", changedChainHandler);
    } else {
      setWalletState((prevState) => ({
        ...prevState,
        errorMessage: "Error connecting to Metamask",
        loading: false,
      }));
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", accountChangeHandler);
        window.ethereum.removeListener("chainChanged", changedChainHandler);
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ ...walletState }}>
      {children}
    </WalletContext.Provider>
  );
}
