const title = document.getElementById("noticeTitle");
const detail = document.getElementById("noticeDetail");
const description = document.getElementById("noticeDescription");
const field = document.getElementById("fieldOfWork");
const type = document.getElementById("typeOfNotice");
const deadline = document.getElementById("deadline");
const tel = document.getElementById("telephone");
const contactEmail = document.getElementById("contactEmail");
const files = document.getElementById("fileAttachment");
const listingForm = document.querySelector(".myForm");
const button = document.querySelector(".clickmE");

// forms
// const noticeForm = document.querySelector(".noticeForm");
// const submitBtn = document.getElementById("btnSubmit");
// Add event listener on load

document.addEventListener("DOMContentLoaded", () => {
  var UsersDB = window.indexedDB.open("users", 2);

  UsersDB.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };
  UsersDB.onsuccess = function (event) {
    console.log("Database is ready");

    DB = event.target.result;
    // displayTheDB()
  };

  UsersDB.onupgradeneeded = function (e) {
    db = e.target.result;

    //   create objectstore
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

    console.log("listings indices created");
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
      title: title.value,
      detail: detail.value,
      description: description.value,
      field: field.value,
      type: type.value,
      contactEmail: contactEmail.value,
      telephone: telephone.value,
      deadline: deadline.value,
    };
    let transaction = DB.transaction(["listings"], "readwrite");

    console.log("Here");
    let listingTable = transaction.objectStore("listings");
    console.log("Here");
    let request;

    request = listingTable.add(newNotice);

    //  when its successful
    request.onsuccess = () => {
      console.log("request sucess!");
      // noticeForm.reset();
      // window.location.href = "./newListing.html";
    };

    //   when the transaction finishes
    transaction.oncomplete = () => {
      console.log("New Notice added");
    };

    //   if there is an error
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
  }
});
