export const capitalize = (value: string) => {
  let result = "";

  const adjustedValue = value.trim();
  if (adjustedValue.length <= 0) return result;
  const adjustedValueSplit = adjustedValue.split(" ");

  for (let i = 0; i < adjustedValueSplit.length; i++) {
    const currentItem = adjustedValueSplit[i];

    result +=
      currentItem[0].toUpperCase() +
      currentItem.slice(1) +
      (i < adjustedValueSplit.length - 1 ? " " : "");
  }
  return result;
};
