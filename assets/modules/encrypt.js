function encrypt(string) {
  var newString = "";
  for (let i = 0; i < string.length; i++) {
    var values = string[i].charCodeAt();
    if (values >= 65 && values <= 90) {
      newString += String.fromCharCode(values + 7);
    }
  }
  return newString;
}
function decrypt(string) {
  var newString = "";
  for (let i = 0; i < string.length; i++) {
    var values = string[i].charCodeAt();
    if (values >= 65 && values <= 90) {
      newString += String.fromCharCode(values - 7);
    }
  }
  console.log(newString);
}

const string = "A";
decrypt(encrypt(string));
