const Username = document.querySelector(".username");
const Password = document.querySelector(".password");
const Email = document.querySelector(".email");

const myForm = document.querySelector(".myForm");

// Add event listener on load

document.addEventListener("DOMContentLoaded", () => {
  let UsersDB = indexedDB.open("users", 1);

  UsersDB.onerror = function () {
    console.log("There was an error");
  };
  UsersDB.onsuccess = function () {
    console.log("Database is ready");

    DB = UsersDB.result;

    // displayTheDB()
  };

  UsersDB.onupgradeneeded = function (e) {
    let db = e.target.result;

    //   create objectstore

    let objectStore = db.createObjectStore("users", {
      keyPath: "id",
      autoIncrement: true,
    });

    // create index

    objectStore.createIndex("username", "username", { unique: true });
    objectStore.createIndex("password", "password", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });

    console.log("Database ready and fields ceated");
  };

  //   add new user when the form is submitted

  myForm.addEventListener("submit", addNewUser);

  //   Function to add new users to the database

  function addNewUser(e) {
    e.preventDefault();

    let newUser = {
      username: Username.value,
      password: Password.value,
      email: Email.value,
    };

    // Insert the object into the database
    let transaction = DB.transaction(["users"], "readwrite");
    let objectStore = transaction.objectStore("users");

    let request = objectStore.add(newUser);

    //  when its successful
    request.onsuccess = () => {
      myForm.reset();
    };

    //   when the transaction finishes
    transaction.oncomplete = () => {
      console.log("New User added");
    };

    //   if there is an error
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
  }
});
