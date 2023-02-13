const checkInput = (location, dateOfDeparture, dateOfReturn) => {
  if (!location || !dateOfDeparture || !dateOfReturn) {
    return false;
  }
  const selectedDateOfDeparture = Date.parse(dateOfDeparture);
  const selectedDateOfReturn = Date.parse(dateOfReturn);
  return (
    selectedDateOfDeparture > Date.now() &&
    selectedDateOfDeparture < selectedDateOfReturn
  );
};

module.exports = checkInput;
