import { observer } from "mobx-react-lite";

import { BaseButton } from "ui/components";

import { Container, InfoLine } from "./styled";
import { useAppStores } from "store";

export default observer(() => {
  const { tezosStore } = useAppStores();

  return (
    <Container>
      <InfoLine>Address: {tezosStore.address}</InfoLine>
      <InfoLine>Balance: {tezosStore.balance}</InfoLine>
      <BaseButton onClick={tezosStore.connect}>Connect</BaseButton>
    </Container>
  );
});
