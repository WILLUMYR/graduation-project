// function to check if string is blank (string of spaces is blank)
const isBlank = str => {
  return !str || /^\s*$/.test(str);
};

module.exports = { isBlank };
