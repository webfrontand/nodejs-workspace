var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0; // type이 문자이고 길이가 1이상일때
}

module.exports = { isRealString };
