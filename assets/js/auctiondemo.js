const urlParams = new URLSearchParams(window.location.search);
var currentUserName = Number(urlParams.get("username"));
// //DB
// var DB;

// UI component

const jumboContainer = document.querySelector(".jumboContainer");

document.addEventListener("DOMContentLoaded", () => {
  getAllAuctions();

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

  function getAllAuctions() {
    let auctionItems = new Localbase("users");

    auctionItems
      .collection("listings")
      .get()
      .then((auctions) => {
        displayAuctions(auctions);
      });
  }

  function displayAuctions(auctions) {
    var i;
    for (i = 0; i < auctions.length; i++) {
      if (auctions[i].id != currentUserName) {
        // create all the necessary fields
        const jumbo = document.createElement("div");
        const title = document.createElement("h1");
        const detail = document.createElement("h5");
        const description = document.createElement("p");
        const line = document.createElement("hr");
        const FOW = document.createElement("p");
        const TON = document.createElement("p");
        const DATE = document.createElement("p");
        const negotiable = document.createElement("p");
        const applicants = document.createElement("p");
        const btnHolder = document.createElement("p");
        const btn = document.createElement("button");
        let det = document.querySelector("mod-detail");
        jumbo.className = "jumbotron";

        title.className = "display-3";
        title.innerHTML = auctions[i].title;

        detail.className = "display-6";
        detail.innerHTML = auctions[i].detail;

        description.className = "lead";
        description.innerHTML = auctions[i].description;

        line.className = "my-4";

        FOW.className = "extraInfo";
        FOW.innerHTML = auctions[i].field;

        TON.className = "extraInfo";
        TON.innerHTML = auctions[i].type;

        DATE.className = "extraInfo";
        DATE.innerHTML = auctions[i].deadline;

        var applicantsNumber =
          auctions[i].applicants == 0
            ? "No applicants yet"
            : `${auctions[i].applicants} applicant(s)`;
        console.log(auctions[i].applicants);
        applicants.innerHTML = applicantsNumber;

        negotiable.className = "extraInfo";
        negotiable.innerHTML = "Negotiable";
        btnHolder.className = "lead";

        btn.className = "btn btn-primary btn-lg bidBtn";
        btn.id = i;
        btn.innerHTML = "Make a bid";

        btn.addEventListener("click", function () {
          console.log(i);
          window.location.href = `bid.html?auctionNumber=${btn.id}`;
        });

        btnHolder.appendChild(btn);

        jumbo.appendChild(title);
        jumbo.appendChild(detail);
        jumbo.appendChild(description);
        jumbo.appendChild(line);
        jumbo.appendChild(FOW);
        jumbo.appendChild(TON);
        jumbo.appendChild(DATE);
        jumbo.appendChild(negotiable);
        jumbo.appendChild(applicants);
        jumbo.appendChild(btnHolder);

        jumboContainer.appendChild(jumbo);
      }
    }
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
