import { WalletProvider } from "./wallet";
import { SnackbarProvider } from "./snackbar";
import { ContractProvider } from "./contract";
import { ToolsFormProvider } from "./toolsformstate";
import { EncryptionStateProvider } from "./encryptionstate";
import { RegisterStateProvider } from "./registerstate";
import { TransactionStateProvider } from "./transactionstate";
import { IdentifierStateProvider } from "../state/identifierstate";

interface Props {
  children: React.ReactNode;
}

export default function CombinedProviders({ children }: Props) {
  return (
    <SnackbarProvider>
      <WalletProvider>
        <ContractProvider>
          <RegisterStateProvider>
            <TransactionStateProvider>
              <IdentifierStateProvider>
                <ToolsFormProvider>
                  <EncryptionStateProvider>{children}</EncryptionStateProvider>
                </ToolsFormProvider>
              </IdentifierStateProvider>
            </TransactionStateProvider>
          </RegisterStateProvider>
        </ContractProvider>
      </WalletProvider>
    </SnackbarProvider>
  );
}
