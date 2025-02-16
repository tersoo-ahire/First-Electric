exports.formatCurrency = (value) => {
  if (isNaN(value) || !value) {
    return value;
  } else {
    value = parseFloat(value.toString().replace(/,/g, ""))
      // .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
  }
};

exports.generateRandomCode = (size = 6, alpha = true) => {
  let characters = alpha
    ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : "0123456789";
  characters = characters.split("");
  let selections = "";
  for (let i = 0; i < size; i++) {
    let index = Math.floor(Math.random() * characters.length);
    selections += characters[index];
    characters.splice(index, 1);
  }
  return selections;
};
