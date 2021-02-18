import { currentUser } from "./app.js";

const homepage = document.querySelector(".homepage");
const newListing = document.querySelector(".newListing");
const activeAuctions = document.querySelector(".activeAuctions");
const myAuctions = document.querySelector(".myAuctions");
const announcements = document.querySelector(".announcements");
const profile = document.querySelector(".profile");

newListing.addEventListener("click", function () {
  window.location.href = `new_tender.html?username=${currentUser}`;
});
activeAuctions.addEventListener("click", function () {
  window.location.href = `auctions.html?username=${currentUser}`;
});
// newListing.addEventListener("click", function () {
//   window.location.href = `myAuctions.html?username=${currentUser}`;
// });
// newListing.addEventListener("click", function () {
//   window.location.href = `announcements.html?username=${currentUser}`;
// });

homepage.addEventListener("click", function () {
  window.location.href = `index.html?username=${currentUser}`;
});

profile.addEventListener("click", function () {
  window.location.href = `profile.html?username=${currentUser}`;
});
