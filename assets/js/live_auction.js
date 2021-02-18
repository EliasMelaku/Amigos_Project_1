  
const noticeDisplay = document.getElementById("noticeDisplay");
var title , detail , descirption , field , type , deadline,tel,email,files;

document.addEventListener("DOMContentLoaded", () => {
        var UsersDB = window.indexedDB.open("users", 2);

        UsersDB.onerror = function(event) {
            console.error("Database error: " + event.target.errorCode);
        };
        UsersDB.onsuccess = function(event) {
            console.log("Database is ready");

            DB = event.target.result;
            // displayTheDB()
        };

        UsersDB.onupgradeneeded = function(e) {
            var db = e.target.result;

            

            console.log("listings indices created");
           
            function addNewNotice(e) {
                e.preventDefault();
               
                var transaction = db.transaction(["listings"]);
var listingTable = transaction.objectStore("listings");
var request;
for (const key of listingTable) {
    request = listingTable.get("key");
   noticeDisplay.innerHTML += `<div class="col-md-8">
   <div class="card-body">
     <h5 class="card-title" id="title_display">${request.title}</h5>
     <p class="card-text" id="description_display">${request.descirption}</p>
     <p class="card-text danger" id="deadline_display"> <small class="text-muted">${request.deadline}</small> </p>

   </div>
</div>`
}


request.onerror = function() {
  // Handle errors!
  console.log("There was an error loading!");
};
request.onsuccess = function() {
  // Do something with the request.result!
  console.log("request success");
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

        }
    })
    