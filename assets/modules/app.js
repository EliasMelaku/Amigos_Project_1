const urlParams = new URLSearchParams(window.location.search);
const currentUser = Number(urlParams.get("username"));

export { currentUser };

//DB
var DB;

// Add Event Listener [on Load]
document.addEventListener("DOMContentLoaded", () => {
  if (currentUser == 0) {
    window.location.href = `signIn.html`;
  }
  console.log(currentUser);
});
