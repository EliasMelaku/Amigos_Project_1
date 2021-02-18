const urlParams = new URLSearchParams(window.location.search);
const currentUser = Number(urlParams.get("username"));

export { currentUser };
//DB
// var DB;

// // Add Event Listener [on Load]
// document.addEventListener("DOMContentLoaded", () => {
//   // create the database
//   let UsersDB = indexedDB.open("users", 1);

//   // if there's an error
//   UsersDB.onerror = function () {
//     console.log("There was an error");
//   };
//   // if everything is fine, assign the result to the instance
//   UsersDB.onsuccess = function () {
//     console.log("Database Ready");

//     DB = UsersDB.result;
//   };

//   console.log(currentUser);
// });
