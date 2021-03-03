// Get all the Ui elements needed

const companyName = document.querySelector(".companyName");
const qualification = document.getElementById("qualification");
const detail = document.getElementById("noticeDetail");
const experience = document.getElementById("experience");
const payment = document.getElementById("payment");

const bidForm = document.querySelector(".myForm");

// get which post it has been bid to

const urlParams = new URLSearchParams(window.location.search);
var currentAuction = Number(urlParams.get("auctionNumber"));

document.addEventListener("DOMContentLoaded", () => {
  var localDB = new Localbase("users");
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
  bidForm.addEventListener("submit", makeBid);
  //   submitBtn.addEventListener("click", addNewNotice);

  // functione to add new notices table to database

  function makeBid(e) {
    e.preventDefault();

    let newBid = {
      yearsExperience: experience.value,
      projTitle: qualification.value,
      detail: detail.value,
      description: payment.value,
    };

    localDB
      .collection("listings")
      .doc({ id: currentAuction })
      .get()
      .then((toUpdate) => {
        let increasedApplicant = toUpdate;
        toUpdate.applicants = Number(toUpdate.applicants) + 1;
        console.log(increasedApplicant);

        let transaction = DB.transaction(["listings"], "readwrite");

        let bids = transaction.objectStore("listings");
        let request;

        request = bids.put(increasedApplicant);

        request.onsuccess = () => {
          console.log("request sucess!");
        };

        request.onerror = () => {
          console.log("transaction.error");
        };
        console.log(toUpdate.applicants);
      });

    let transaction = DB.transaction(["bids"], "readwrite");

    let bids = transaction.objectStore("bids");
    let request;

    request = bids.add(newBid);

    //  when its successful

    // const urlParams = new URLSearchParams(window.location.search);
    // const currentUser = Number(urlParams.get("username"));
    // window.location.href = `new_tender.html?username=${currentUser}`;
    // listingForm.reset();

    //   when the transaction finishes
    transaction.oncomplete = () => {
      bidForm.reset();
      //   history.back();
    };

    //   if there is an error
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
  }
});
