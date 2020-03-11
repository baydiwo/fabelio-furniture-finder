export const convertCurrency = (val = 0) => {
  const options = {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
  const convertedNum = new Intl.NumberFormat(["id"], options).format(
    parseInt(val, 0)
  );
  return convertedNum;
};
