import { useCallback, useState } from "react";
import { TempleWallet } from "@temple-wallet/dapp";

import { BaseButton } from "ui/components";

import { Container, InfoLine } from "./styled";

export default () => {
  const [walletInfo, setWalletInfo] = useState({
    address: "",
    balance: 0,
  });

  const connectHandler = useCallback(async () => {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
    const wallet = new TempleWallet("Farkle");
    await wallet.connect("granadanet");
    const tezos = wallet.toTezos();
    const address = await tezos.wallet.pkh();
    const balance = await tezos.tz.getBalance(address);

    setWalletInfo({
      address,
      balance: balance.toNumber(),
    });
  }, []);

  return (
    <Container>
      <InfoLine>Address: {walletInfo?.address}</InfoLine>
      <InfoLine>Balance: {walletInfo?.balance}</InfoLine>
      <BaseButton onClick={connectHandler}>Connect</BaseButton>
    </Container>
  );
};
