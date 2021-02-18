// Get the input fields and form

const Username = document.querySelector(".username");
const Password = document.querySelector(".password");
const Cpassword = document.querySelector(".cpassword");
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

    // Same for the auctions database
    var listingTable = db.createObjectStore("listings", {
      keypath: "id",
      autoIncrement: true,
    });
    console.log("listings id created");
    listingTable.createIndex("title", "title", { unique: false });
    listingTable.createIndex("detail", "detail", { unique: false });
    listingTable.createIndex("description", "description", { unique: false });
    listingTable.createIndex("field", "field", { unique: false });
    listingTable.createIndex("type", "type", { unique: false });
    listingTable.createIndex("deadline", "deadline", { unique: false });
    listingTable.createIndex("telephone", "telephone", { unique: false });
    listingTable.createIndex("contactEmail", "contactEmail", {
      unique: false,
    });
    listingTable.createIndex("files", "files", { unique: false });

    console.log("Database ready and fields ceated");
  };

  //   check if the input is correct before submitting
  Username.addEventListener("keyup", checkIfUserCorrect);
  Password.addEventListener("keyup", checkIfPassCorrect);
  Cpassword.addEventListener("keyup", checkIfPassCorrect);
  //   Email.addEventListener("blur", checkIfEmailCorrect);

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

    let request;

    if (Password.value == Cpassword.value && checkIfUserCorrect()) {
      request = objectStore.add(newUser);
    } else {
      alert("Passwords don't match or incorrect username");
      console.log(checkIfUserCorrect());
      return;
    }
    //  when its successful
    request.onsuccess = (e) => {
      // console.log(e.target.result);
      window.location.href = `../index.html?username=${e.target.result}`;
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

  //   function to check if the input is correct
  function checkIfUserCorrect() {
    var value = Username.value;
    if (value !== "") {
      var userRegex = /^[A-Za-z0-9_-]{4,16}$/;
      var userResult = userRegex.test(value);
      if (userResult == false) {
        document.querySelector(".username").style.boxShadow =
          "0 0 5px 0.2px #CA0B00";
        document.querySelector(".username").style.border = "none";
      } else {
        document.querySelector(".username").style.boxShadow =
          "0 0 5px 0.2px #4BB543";
        document.querySelector(".username").style.border = "none";
      }
    } else {
      document.querySelector(".username").style.boxShadow =
        "0 0 5px 0.2px #CA0B00";
      document.querySelector(".username").style.border = "none";
      console.log("Its Empty");
    }
    return userResult;
  }
  function checkIfPassCorrect() {
    var value = Password.value;
    var value2 = Cpassword.value;
    if (value !== "") {
      var passRegex = /^[A-Za-z0-9_-]{4,16}$/;
      var passResult = passRegex.test(value);
      if (passResult == false || value != value2) {
        document.querySelector(".password").style.boxShadow =
          "0 0 5px 0.2px #CA0B00";
        document.querySelector(".password").style.border = "none";
        console.log("Something is up");
      } else {
        document.querySelector(".password").style.boxShadow =
          "0 0 5px 0.2px #4BB543";
        document.querySelector(".password").style.border = "none";
      }
    } else {
      document.querySelector(".password").style.boxShadow =
        "0 0 5px 0.2px #CA0B00";
      document.querySelector(".password").style.border = "none";
      console.log("Its Empty");
    }
  }
});
