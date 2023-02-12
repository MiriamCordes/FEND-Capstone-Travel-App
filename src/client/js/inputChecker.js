const checkInput = (location, date) => {
  if (!location || !date) {
    return false;
  }
  const selectedDate = Date.parse(date);
  return selectedDate > Date.now();
};

module.exports = checkInput;
