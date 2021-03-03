document.addEventListener("DOMContentLoaded", () => {
  let UsersDB = indexedDB.open("users", 1);

  UsersDB.onerror = function () {
    console.log("There was an error");
  };
  UsersDB.onsuccess = function () {
    console.log("Database is ready");

    DB = UsersDB.result;
  };

  myForm.addEventListener("submit", signIn);

  function signIn(e) {
    e.preventDefault();
  }
});
