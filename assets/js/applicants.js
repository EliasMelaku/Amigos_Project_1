const urlParams = new URLSearchParams(window.location.search);
var currentAuction = String(urlParams.get("auctionNumber"));
// //DB
// var DB;

// UI component

const jumboContainer = document.querySelector(".table");

document.addEventListener("DOMContentLoaded", () => {
  getAllBidders();

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

  function getAllBidders() {
    let bidders = new Localbase("users");
    bidders
      .collection("bids")
      .get()
      .then((auctions) => {
        if (auctions != undefined) {
          displayBidders(auctions);
        } else {
          notFound();
        }
      });
  }

  function displayBidders(auctions) {
    var i;
    const applicants = document.querySelector(".applicantBody");

    console.log(auctions.length);

    for (i = 0; i < auctions.length; i++) {
      if (auctions[i].projTitle == "Endlskd") {
        // create all the necessary fields
        const row = document.createElement("tr");
        const applicantId = document.createElement("td");
        const qualification = document.createElement("td");
        const experience = document.createElement("td");
        const description = document.createElement("td");

        //   applicantId.className = "display-3";
        applicantId.innerHTML = auctions[i].projTitle;

        //   detail.className = "display-6";
        qualification.innerHTML = auctions[i].jprojTitle;

        //   description.className = "lead";

        experience.innerHTML = auctions[i].yearsExperience;
        description.innerHTML = auctions[i].description;

        //   var applicantsNumber =
        //     auctions[i].applicants == 0
        //       ? "No applicants yet"
        //       : `${auctions[i].applicants} applicant(s)`;
        //   console.log(auctions[i].applicants);
        //   applicants.innerHTML = applicantsNumber;

        //   negotiable.className = "extraInfo";
        //   negotiable.innerHTML = "Negotiable";
        //   btnHolder.className = "lead";

        //   btn.className = "btn btn-primary btn-lg bidBtn";
        //   btn.id = i;
        //   btn.innerHTML = "Make a bid";

        //   btn.addEventListener("click", function () {
        //     console.log(i);
        //     window.location.href = `bid.html?auctionNumber=${Number(btn.id) + 1}`;
        //   });

        //   btnHolder.appendChild(btn);

        //   jumbo.appendChild(title);
        //   jumbo.appendChild(detail);
        //   jumbo.appendChild(description);
        //   jumbo.appendChild(line);
        //   jumbo.appendChild(FOW);
        //   jumbo.appendChild(TON);
        //   jumbo.appendChild(DATE);
        row.appendChild(applicantId);
        row.appendChild(qualification);
        row.appendChild(experience);
        row.appendChild(description);

        applicants.appendChild(row);
      }
    }
  }

  function notFound() {
    alert("no applicatns found");
  }
  // function updateUserCredentials(e) {
  //   e.preventDefault();
  //   let usersTable = new Localbase("users");

  //   usersTable
  //     .collection("users")
  //     .doc({ id: 1 })
  //     .get()
  //     .then((currentUser) => {
  //       var transaction = DB.transaction(["users"], "readwrite");
  //       var objectStore = transaction.objectStore("users");

  //       let newValue = {
  //         username: Username.value,
  //         password: Password.value,
  //         email: Email.value,
  //         id: currentUser.id,
  //       };

  //       objectStore.put(newValue);

  //       currentUserName = newValue.username;
  //       window.alert("Account credentials edited");
  //       displayUsers();
  //     });
  // }
});
