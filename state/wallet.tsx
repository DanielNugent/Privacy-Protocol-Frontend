declare let window: any;
import { createContext, useState, useEffect } from "react";
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
  loading: boolean;
  disconnected: boolean;
}

interface IWalletContext {
  errorMessage: string | null;
  defaultAccount: any;
  loading: boolean;
  disconnected: boolean;
  requestConnectWallet: () => void;
}

export const WalletContext = createContext<IWalletContext>({
  errorMessage: null,
  defaultAccount: null,
  loading: false,
  disconnected: false,
  requestConnectWallet: () => {},
});

export function WalletProvider({ children }: Props) {
  const [walletState, setWalletState] = useState<IWallet>({
    errorMessage: null,
    defaultAccount: null,
    loading: true,
    disconnected: false,
  });
  

  function requestConnectWallet() {
    if (window.ethereum) {
      setWalletState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: Array<string>) => {
          accountsChangedHandler(result);
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
        disconnected: false,
      }));
    }
  }

  function accountsChangedHandler(addresses: Array<string>) {
    let errorMsg = addresses[0] ? null : WALLET_DISCONNECTED_MESSAGE;
    if (!errorMsg) {
      setWalletState((prevState) => ({
        ...prevState,
        defaultAccount: addresses[0],
        errorMessage: null,
        loading: false,
      }));
    } else {
      setWalletState((prevState) => ({
        ...prevState,
        defaultAccount: addresses[0],
        errorMessage: errorMsg,
        loading: false,
        disconnected: true,
      }));
    }
  }

  function changedChainHandler(chain_id: string) {
    if (chain_id === CHAIN_ID) window.location.reload();
    else
      setWalletState((prevState) => ({
        ...prevState,
        errorMessage: WRONG_CHAIN_MESSAGE,
        disconnected: false
      }));
  }

  function handleNetworkSwitch() {
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
  }

  useEffect(() => {
    requestConnectWallet();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChangedHandler);
      window.ethereum.on("chainChanged", changedChainHandler);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          accountsChangedHandler
        );
        window.ethereum.removeListener("chainChanged", changedChainHandler);
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ ...walletState, requestConnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}
