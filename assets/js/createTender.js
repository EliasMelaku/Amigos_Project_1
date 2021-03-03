const userName = document.querySelector(".username");
const title = document.getElementById("noticeTitle");
const detail = document.getElementById("noticeDetail");
const description = document.getElementById("noticeDescription");
const field = document.getElementById("fieldOfWork");
const type = document.getElementById("typeOfNotice");
const deadline = document.getElementById("deadline");
var files, filename;

function fileName() {
  files = document.getElementById("fileAttachment");
  filename = `${files.files.items(0).name}`;
}
const listingForm = document.querySelector(".myForm");
const button = document.querySelector(".clickmE");

// forms
// const noticeForm = document.querySelector(".noticeForm");
// const submitBtn = document.getElementById("btnSubmit");
// Add event listener on load

document.addEventListener("DOMContentLoaded", () => {
  var UsersDB = indexedDB.open("users", 1);

  UsersDB.onerror = function (event) {
    console.log("There was an error");
  };
  UsersDB.onsuccess = function (event) {
    console.log("Database is ready");

    DB = event.target.result;
    // displayTheDB()
  };

  // listingTable.transaction.oncomplete=function (event) {
  //     var newNotice = db.transaction("listings", "readWrite").objectStore("listings");

  // }
  listingForm.addEventListener("submit", addNewNotice);
  //   submitBtn.addEventListener("click", addNewNotice);

  // functione to add new notices table to database
  function addNewNotice(e) {
    e.preventDefault();
    console.log(title.value);
    let newNotice = {
      username: userName.value,
      title: title.value,
      detail: detail.value,
      description: description.value,
      field: field.value,
      type: type.value,
      deadline: deadline.value,
      files: filename,
    };
    let transaction = DB.transaction(["listings"], "readwrite");

    let listingTable = transaction.objectStore("listings");
    let request;

    request = listingTable.add(newNotice);

    //  when its successful
    request.onsuccess = () => {
      console.log("request sucess!");

      const urlParams = new URLSearchParams(window.location.search);
      const currentUser = Number(urlParams.get("username"));
      window.location.href = `new_tender.html?username=${currentUser}`;
      // listingForm.reset();
    };

    //   when the transaction finishes
    transaction.oncomplete = () => {
      listingForm.reset();
      alert("New Notice added");
    };

    //   if there is an error
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
  }
});
