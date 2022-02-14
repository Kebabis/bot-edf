function aleatorio() {
  var num = Math.floor(Math.random() * 2);
  if (num % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = aleatorio;
