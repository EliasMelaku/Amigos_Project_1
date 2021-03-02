
const urlParams = new URLSearchParams(window.location.search);
var currentUserName = Number(urlParams.get("username"));
//DB
var DB;

// UI components

var editForm = document.querySelector(".myForm");
var Username = document.querySelector(".username");
var Password = document.querySelector(".password");

var Email = document.querySelector(".email");
// var edit = document.querySelector("approveEdit");

document.addEventListener("DOMContentLoaded", () => {
  displayUsers();

  let usersDBVanilla = indexedDB.open("users", 1);

  // if there's an error
  usersDBVanilla.onerror = function () {
    console.log("There was an error");
  };
  // if everything is fine, assign the result to the instance
  usersDBVanilla.onsuccess = function () {
    // console.log('Database Ready');

    // save the result
    DB = usersDBVanilla.result;
  };

  editForm.addEventListener("submit", updateUserCredentials);

  function displayUsers() {
    let usersTable = new Localbase("users");

    usersTable
      .collection("users")
      .doc({ id: currentUserName })
      .get()
      .then((currentUser) => {
        Username.value = currentUser.username;
        Password.value = currentUser.password;
        Email.value = currentUser.email;
      });
  }
  function updateUserCredentials(e) {
    e.preventDefault();
    let usersTable = new Localbase("users");

    usersTable
      .collection("users")
      .doc({ id: 1 })
      .get()
      .then((currentUser) => {
        var transaction = DB.transaction(["users"], "readwrite");
        var objectStore = transaction.objectStore("users");

        let newValue = {
          username: Username.value,
          password: Password.value,
          email: Email.value,
          id: currentUser.id,
        };

        objectStore.put(newValue);

        currentUserName = newValue.username;
        window.alert("Account credentials edited");
        displayUsers();
      });
  }
});
