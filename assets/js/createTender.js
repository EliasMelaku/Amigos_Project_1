// JavaScript Document
//===================================================================================================
const Title= document.getElementById("noticeTitle");
const Detail = document.getElementById("noticeDetail");
const Organization = document.getElementById('noticeOrganization');
const Description = document.getElementById('noticeDescription');
const fieldList = document.getElementById('fieldOfWork');
const typeList = document.getElementById('typeOfNotice');
const Deadline = document.getElementById('deadline');
const Payment = document.getElementsByName('paymentCondition');
const Telephone = document.getElementById('telephone');
const Email = document.getElementById('email');
const Attachment  = document.getElementById('fileAttachment');
const myForm = document.querySelector("#myForm");
let PaymentPreference;

for (let i = 0; i < Payment.length; i++) {
	if (Payment[i].checked) {
		PaymentPreference = Payment[i];
	}
}
// Add event listener on load

document.addEventListener("DOMContentLoaded", () => {
  let noticedb = indexedDB.open("notices", 1);

  noticedb.onerror = function () {
    console.log("There was an error");
  };
  noticedb.onsuccess = function () {
    console.log("Database is ready");

    DB = noticedb.result;

    // displayTheDB()
  };

  noticedb.onupgradeneeded = function (e) {
    let db = e.target.result;

    //   create objectstore

    let objectStore = db.createObjectStore("notices", {
      keyPath: "id",
      autoIncrement: true,
    });

    // create index

    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("detail", "detail", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex("organization", "organization", { unique: false });
    objectStore.createIndex("fieldlist", "fieldlist", { unique: false });
    objectStore.createIndex("typelist", "typelist", { unique: false });
    objectStore.createIndex("deadline", "deadline", { unique: false });
    objectStore.createIndex("payment", "payment", { unique: false });
    objectStore.createIndex("telephone", "telephone", { unique: false });
    objectStore.createIndex("attachment", "attachment", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });

    console.log("Database ready and fields ceated");
  };

  //   check if the input is correct before submitting
//	  Title.addEventListener("blur", checkIfTextCorrect);
//	  Password.addEventListener("keyup", checkIfPassCorrect);
//    Email.addEventListener("blur", checkIfEmailCorrect);

  //   add new user when the form is submitted

  myForm.addEventListener("submit", addNewNotice);

  //   Function to add new users to the database

  function addNewNotice(e) {
    e.preventDefault();

    let newNotice = {
		title: Title.value,
		detail: Detail.value,
		organization: Organization.value,
		description: Description.value,
		fieldlist: fieldList.value,
		typelist: typeList.value,
		payment: PaymentPreference,
		telephone: Telephone.value,
		deadline: Deadline.value,
		email: Email.value,
		attachment: Attachment.files[0].name
    };

    // Insert the object into the database
    let transaction = DB.transaction(["notices"], "readwrite");
    let objectStore = transaction.objectStore("notices");

    let request = objectStore.add(newNotice);

//    if (Password.value == Cpassword.value) {
//      request = objectStore.add(newNotice);
//    } else {
//      alert("Passwords don't match");
//      return;
//    }

    //  when its successful
    request.onsuccess = () => {
      myForm.reset();
      window.location.href = "../myAuctions";
    };

    //   when the transaction finishes
    transaction.oncomplete = () => {
      console.log("New Notice added");
    };

    //   if there is an error
    transaction.onerror = () => {
      alert("There was an error, please try again!");
    };
  }

  //   functio to check if the input is correct
//  function checkIfTextCorrect(TextIpt) {
//    var value = TextIpt.value;
//    if (value !== "") {
//      var userRegex = /[A-Za-z,-.]{4,16}$/;
//      var userResult = userRegex.test(value);
//      if (userResult == false) {
//        document.querySelector(".username").style.boxShadow =
//          "0 0 5px 0.2px #CA0B00";
//        document.querySelector(".username").style.border = "none";
//        console.log("Something is up");
//      } else {
//        document.querySelector(".username").style.boxShadow =
//          "0 0 5px 0.2px #4BB543";
//        document.querySelector(".username").style.border = "none";
//      }
//    } else {
//      document.querySelector(".username").style.boxShadow =
//        "0 0 5px 0.2px #CA0B00";
//      document.querySelector(".username").style.border = "none";
//      console.log("Its Empty");
//    }
//  }

});
