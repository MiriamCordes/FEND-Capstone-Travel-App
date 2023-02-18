const checkInput = (location, dateOfDeparture, dateOfReturn) => {
  // ensure that user added necessary data
  if (!location || !dateOfDeparture || !dateOfReturn) {
    return false;
  }
  const selectedDateOfDeparture = Date.parse(dateOfDeparture);
  const selectedDateOfReturn = Date.parse(dateOfReturn);
  // ensure that date of departure is in future and before date of return
  return (
    selectedDateOfDeparture > Date.now() &&
    selectedDateOfDeparture < selectedDateOfReturn
  );
};

module.exports = checkInput;
