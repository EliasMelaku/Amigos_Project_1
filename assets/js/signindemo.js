
      const Username = document.querySelector(".username");
      const Password = document.querySelector(".password");
      const myForm = document.querySelector(".myForm");
      const eye = document.querySelector(".theEye");

      // Add event listener to the eye
      eye.addEventListener("click", function (e) {
        // toggle the type attribute
        const type =
          Password.getAttribute("type") === "password" ? "text" : "password";
        Password.setAttribute("type", type);
        // toggle the eye slash icon
        this.classList.toggle("fa-eye-slash");
      });

      myForm.addEventListener("submit", logIn);

      function logIn(e) {
        e.preventDefault();

        let users = new Localbase("users");
        let userFound = true;
        let logger = {
          username: Username.value,
          password: Password.value,
        };
        users
          .collection("users")
          .get()
          .then((listOfUsers) => {
            for (var i = 0; i < listOfUsers.length; i++) {
              if (listOfUsers[i].username == logger.username) {
                if (listOfUsers[i].password == logger.password) {
                  myForm.reset();

                  users
                    .collection("users")
                    .doc({ id: i + 1 })
                    .get()
                    .then((theUser) => {
                      // console.log(theUser.id);
                      window.location.href = `index.html?username=${theUser.id} `;
                      userFound = true;
                    });
                  break;
                } else {
                  document.querySelector(".errorPass").style.visibility =
                    "visible";
                  document.querySelector(".error").style.visibility = "hidden";
                  userFound = true;
                  break;
                }
              } else {
                userFound = false;
              }
            }
            if (!userFound) {
              document.querySelector(".error").style.visibility = "visible";
              document.querySelector(".errorPass").style.visibility = "hidden";
            }
          });
      }
    