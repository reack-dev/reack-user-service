function generateRandomString(length) {
  possibleCharacters =
    'abcdefghijklmnopqrstuvwxyz0123456789';
  nbOfChoices = possibleCharacters.length;

  result = '';
  for (let i = 0; i < length; i++) {
    selectedChar = possibleCharacters[Math.floor(Math.random() * nbOfChoices)];
    result += selectedChar;
  }
  return result;
}

module.exports = {
  generateRandomString,
};
