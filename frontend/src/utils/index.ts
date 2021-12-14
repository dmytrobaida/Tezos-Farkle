export function parseBalance(balance: number) {
  if (!balance) {
    return 0;
  }
  const decimals = 6;
  let afterDecimal;
  const tezString = balance.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal =
    tezString.length > decimals
      ? tezString.slice(0, tezString.length - decimals)
      : "0";
  afterDecimal = ("0".repeat(decimals) + balance)
    .slice(-decimals)
    .replace(trailingZeros, "");
  if (afterDecimal === "") {
    afterDecimal = "0";
  } else if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }
  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}
