import { WalletProvider } from "./wallet";
import { SnackbarProvider } from "./snackbar";
import { ContractProvider } from "./contract";
import { ToolsFormProvider } from "./toolsformstate";
import { EncryptionStateProvider } from "./encryptionstate";

interface Props {
  children: React.ReactNode;
}

export default function CombinedProviders({ children }: Props) {
  return (
    <SnackbarProvider>
      <WalletProvider>
        <ContractProvider>
          <ToolsFormProvider>
            <EncryptionStateProvider>{children}</EncryptionStateProvider>
          </ToolsFormProvider>
        </ContractProvider>
      </WalletProvider>
    </SnackbarProvider>
  );
}
